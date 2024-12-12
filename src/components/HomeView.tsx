"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import MaxQuantityFilter from "./MaxQuantityFilter";
import ProductList from "./ProductList";

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

export default function HomeView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [maxQuantity, setMaxQuantity] = useState<number | null>(null);
  const [lowQuantityItems, setLowQuantityItems] = useState<Product[]>([]);

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

        const lowQuantity = productsData.filter((product) => product.quantity < 5);
        setLowQuantityItems(lowQuantity);
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
    <div>
      {lowQuantityItems.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <h2 className="font-bold text-lg mb-2">Low Quantity Alerts</h2>
          <ul>
            {lowQuantityItems.map((item) => (
              <li key={item.id}>
                {item.name}: <span className="font-bold">{item.quantity}</span> left
              </li>
            ))}
          </ul>
        </div>
      )}

      <CategoryFilter
        categories={categories}
        onCategoryChange={setSelectedCategory}
      />
      <MaxQuantityFilter onMaxQuantityChange={setMaxQuantity} />
      <ProductList products={filteredProducts} />
    </div>
  );
}
