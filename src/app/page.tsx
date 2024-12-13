'use client';

import { useState } from "react";
import HomeView from "../components/index_page/HomeView";
import TableShow from "../components/TableShow";
import Login from "../components/Login";
import Register from "../components/Register";
import StockManager from "../components/StockManager";
import StockMovements from "../components/StockMovements";
import { useAuth, AuthProvider } from "../context/AuthContext"; // Assuming you have an AuthProvider

const AppContent: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [view, setView] = useState<"home" | "product" | "stock" | "movements" | "category">("home");

  if (!isAuthenticated) {
    return (
      <div>
        <Login />
        <Register />
      </div>
    );
  }

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

      {view === "stock" && (
        <div>
          <h1>Manage Stock</h1>
          <StockManager />
        </div>
      )}

      {view === "movements" && (
        <div>
          <h1>Stock Movements</h1>
          <StockMovements />
        </div>
      )}
    </main>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
