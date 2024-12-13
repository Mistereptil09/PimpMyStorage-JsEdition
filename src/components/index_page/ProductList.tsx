type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded p-4 shadow hover:shadow-md transition"
        >
          <h2 className="font-bold text-lg">{product.name}</h2>
          <p>{product.description}</p>
          <p className="text-green-600 font-semibold">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
