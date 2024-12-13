'use client';

import { useState } from "react";
import HomeView from "../components/HomeView";
import EditView from "../components/EditView";
import StockManager from "../components/StockManager";
import StockMovements from "../components/StockMovements";
import TableShow from "../components/TableShow";

export default function Home() {
  const [view, setView] = useState<"home" | "edit" | "stock" | "movements">("home");

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Product Inventory</h1>

      {/* View Switcher */}
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            view === "home" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("home")}
        >
          Home
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            view === "edit" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("edit")}
        >
          Edit Products
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            view === "stock" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("stock")}
        >
          Manage Stock
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "movements" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("movements")}
        >
          Stock Movements
        </button>
      </div>

      {/* Render Views */}
      {view === "home" && (
        <div>
          <h1>Show Index Page</h1>
          <HomeView />
          <div>
            <h1>Data Table Category</h1>
            <TableShow apiLink="/api/categories" />
          </div>
          <div>
            <h1>Data Table Product</h1>
            <TableShow apiLink="/api/products" />
          </div>
        </div>
      )}
      {view === "edit" && <EditView />}
      {view === "stock" && <StockManager />}
      {view === "movements" && <StockMovements />}
    </main>
  );
}
