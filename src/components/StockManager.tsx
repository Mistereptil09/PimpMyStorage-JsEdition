"use client";
import { useEffect, useState } from "react";
type Product = {
  id: number;
  name: string;
  quantity: number;
};
export default function StockManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [changes, setChanges] = useState<Record<number, { action: string; value: number }>>({});
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const fetchedProducts: Product[] = await response.json();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleInputChange = (id: number, value: number) => {
    setChanges((prev) => ({
      ...prev,
      [id]: { ...prev[id], value: isNaN(value) ? 0 : value },
    }));
  };
  const handleActionChange = (id: number, action: string) => {
    setChanges((prev) => ({
      ...prev,
      [id]: { ...prev[id], action },
    }));
  };
  const handleSaveAll = async () => {
    const modifiedProducts = Object.entries(changes).map(([id, change]) => ({
      id: parseInt(id, 10),
      action: change.action,
      value: change.value,
    }));
  
    try {
      const response = await fetch("/api/stock-movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifiedProducts),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save stock movements");
      }
  
      setChanges({});
      await fetchProducts();
    } catch (error) {
      console.error("Error saving stock movements:", error);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Stock Management</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Product Name
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Current Quantity
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Change Quantity
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-b text-sm text-gray-700">{product.name}</td>
              <td className="px-6 py-4 border-b text-sm text-gray-700">{product.quantity}</td>
              <td className="px-6 py-4 border-b text-sm text-gray-700">
                <input
                  type="number"
                  className="border rounded w-20 p-2"
                  value={changes[product.id]?.value || ""}
                  onChange={(e) =>
                    handleInputChange(product.id, parseInt(e.target.value, 10))
                  }
                  placeholder="0"
                />
              </td>
              <td className="px-6 py-4 border-b text-sm text-gray-700">
                <select
                  className="border rounded p-2"
                  value={changes[product.id]?.action || ""}
                  onChange={(e) => handleActionChange(product.id, e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Add">Add</option>
                  <option value="Subtract">Subtract</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-6">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          onClick={handleSaveAll}
        >
          Save All
        </button>
      </div>
    </div>
  );
}