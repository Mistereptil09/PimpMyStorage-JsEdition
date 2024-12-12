"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  quantity: number;
};

type Category = {
  id: number;
  name: string;
};

export default function EditView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (productId: number) => {
    const product = products.find((p) => p.id === productId) || null;
    setSelectedProduct(product);
  };

  const handleSave = () => {
    console.log("Saving product:", selectedProduct);
    // Add your save logic here
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="w-full max-w-3xl">
      {!selectedProduct && (
        <>
          <h2 className="text-lg font-bold mb-4">Edit Products</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
                  Name
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
                  Quantity
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b text-sm text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-700">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-700">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedProduct && (
        <div className="w-full max-w-lg bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Edit Product</h2>
          <form>
            {/* Form fields for editing */}
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
