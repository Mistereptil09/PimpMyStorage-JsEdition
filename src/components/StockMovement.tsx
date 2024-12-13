"use client";

import { useEffect, useState } from "react";

type StockMovement = {
  id: number;
  date: string;
  reason: string;
  movement_type: string;
  quantity: number;
  stock_movement_has_product: {
    product: {
      name: string;
    };
  }[];
};

export default function StockMovements() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    const fetchStockMovements = async () => {
      try {
        const response = await fetch("/api/stock-movements");
        if (!response.ok) {
          throw new Error("Failed to fetch stock movements");
        }
        const data: StockMovement[] = await response.json();
        setStockMovements(data);
      } catch (error) {
        console.error("Error fetching stock movements:", error);
      }
    };

    fetchStockMovements();
  }, []);

  const exportToCSV = () => {
    const csvRows: string[] = [];
    const headers = ["Date", "Reason", "Movement Type", "Quantity", "Products"];
    csvRows.push(headers.join(","));

    stockMovements.forEach((movement) => {
      const products = movement.stock_movement_has_product
        .map((item) => item.product.name)
        .join(" | "); // Join product names with a separator
      csvRows.push(
        [
          movement.date,
          movement.reason,
          movement.movement_type,
          movement.quantity,
          products,
        ].join(",")
      );
    });

    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "stock_movements.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Stock Movements</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={exportToCSV}
        >
          Download CSV
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Date
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Reason
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Movement Type
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Quantity
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">
              Products
            </th>
          </tr>
        </thead>
        <tbody>
          {stockMovements.map((movement) => (
            <tr key={movement.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-b text-sm text-gray-700">{movement.date}</td>
              <td className="px-6 py-4 border-b text-sm text-gray-700">{movement.reason}</td>
              <td className="px-6 py-4 border-b text-sm text-gray-700">
                {movement.movement_type}
              </td>
              <td className="px-6 py-4 border-b text-sm text-gray-700">{movement.quantity}</td>
              <td className="px-6 py-4 border-b text-sm text-gray-700">
                <ul>
                  {movement.stock_movement_has_product.map((item) => (
                    <li key={item.product.name}>{item.product.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
