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
  const { isAuthenticated } = useAuth();
  const [view, setView] = useState<"home" | "product" | "stock" | "movements" | "category">("home");
  const [authView, setAuthView] = useState<"login" | "register">("login");

  if (!isAuthenticated) {
    return (
      <div className="p-5 bg-gray-100">
        <div className="mb-5">
          <button 
            className="mr-2 p-2 bg-blue-500 text-white rounded"
            onClick={() => setAuthView("login")}
          >
            Login
          </button>
          <button 
            className="p-2 bg-green-500 text-white rounded"
            onClick={() => setAuthView("register")}
          >
            Register
          </button>
        </div>
        {authView === "login" ? <Login /> : <Register />}
      </div>
    );
  }

  return (
    <main className="p-5 bg-gray-100">
      <h1 className="mb-5 text-gray-800">Product Inventory</h1>

      {/* View Switcher */}
      <div className="mb-5">
        <button 
          className="mr-2 p-2 bg-blue-500 text-white rounded"
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
          className="mr-2 p-2 bg-blue-500 text-white rounded"
          onClick={() => setView("movements")}
        >
          Stock Movements
        </button>
        <button 
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => setView("category")}
        >
          Category
        </button>

      </div>

      {/* Render Views */}
      {view === "home" && (
        <div>
          <HomeView />
        </div>
      )}

      {view === "product" && (
        <div>
          <TableShow apiLink="/api/products" />
        </div>
      )}

      {view === "category" && (
        <div>
          <TableShow apiLink="/api/categories" />
        </div>
      )}

      {view === "stock" && (
        <div>
          <StockManager />
        </div>
      )}

      {view === "movements" && (
        <div>
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
