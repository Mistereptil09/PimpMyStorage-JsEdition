"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import MaxQuantityFilter from "../components/MaxQuantityFilter";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number; // Match database field
  quantity: number;
};

type Category = {
  id: number;
  name: string;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [maxQuantity, setMaxQuantity] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch("/api/categories");
        const productsResponse = await fetch("/api/products");

        if (!categoriesResponse.ok || !productsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (product) => product.category_id === selectedCategory
      );
    }

    if (maxQuantity !== null) {
      filtered = filtered.filter((product) => product.quantity <= maxQuantity);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, maxQuantity, products]);

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Product Inventory</h1>
      <CategoryFilter
        categories={categories}
        onCategoryChange={setSelectedCategory}
      />
      <MaxQuantityFilter onMaxQuantityChange={setMaxQuantity} />
      <ProductList products={filteredProducts} />
    </main>
  );
}
