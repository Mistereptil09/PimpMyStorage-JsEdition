type Category = {
  id: number;
  name: string;
};

type CategoryFilterProps = {
  categories: Category[];
  onCategoryChange: (categoryId: number | "") => void;
};

export default function CategoryFilter({
  categories,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-4">
      <label htmlFor="category-select" className="mr-2">
        Filter by Category:
      </label>
      <select
        id="category-select"
        onChange={(e) =>
          onCategoryChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="border rounded p-2"
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
}
