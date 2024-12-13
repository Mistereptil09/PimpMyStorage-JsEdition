'use client';

import { useState } from "react";
import HomeView from "../components//index_page/HomeView";
//import StockManager from "../components/StockManager";
//import StockMovements from "../components/StockMovements";
import TableShow from "../components/TableShow";

export default function Home() {
  const [view, setView] = useState<"home" | "product" | "stock" | "movements" | "category">("home");

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
            view === "product" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("product")}
        >
          Products
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

        <button
          className={`mr-2 px-4 py-2 rounded ${
            view === "category" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("category")}
        >
          Category
        </button>
      </div>

      {/* Render Views */}
      {view === "home" && (
        <div>
          <h1>Show Index Page</h1>
          <HomeView />
        </div>
      )}

      {view === "product" && (
        <div>
          <h1>Show Table Show</h1>
          <TableShow apiLink="/api/products" />
        </div> 
      )}

      {view === "category" && (
        <div>
          <h1>Show Table Show</h1>
          <TableShow apiLink="/api/categories" />
        </div> 
      )}



      {/*view === "stock" && <StockManager />}
      {view === "movements" && <StockMovements />*/}
    </main>
  );
}