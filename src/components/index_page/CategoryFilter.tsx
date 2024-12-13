import React from 'react';

type Category = {
  id: number;
  name: string;
};

interface CategoryFilterProps {
  categories: Category[];
  onCategoryChange: (categoryId: number | "") => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onCategoryChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-accent font-bold mb-2" htmlFor="category">
        Category
      </label>
      <select
        id="category"
        className="border-accent text-accent w-full p-2 mb-4 border rounded"
        onChange={(e) => onCategoryChange(Number(e.target.value) || "")}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;