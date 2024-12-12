"use client";

import { useState } from "react";
import HomeView from "../components/HomeView";
import EditView from "../components/EditView";

export default function Home() {
  const [view, setView] = useState<"home" | "edit">("home");

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Product Inventory</h1>

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
          className={`px-4 py-2 rounded ${
            view === "edit" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("edit")}
        >
          Edit Products
        </button>
      </div>

      {/* Render Views */}
      {view === "home" && <HomeView />}
      {view === "edit" && <EditView />}
    </main>
  );
}
