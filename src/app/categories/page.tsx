// src/app/categories/page.tsx
import { category } from '@prisma/client'; // Prisma automatically generates this type
import prisma from '@/lib/prisma';
import Table from '../../components/Table';

export default async function CategoriesPage() {
  const categories: category[] = await prisma.category.findMany();

  const headers = ['ID', 'Name', "parent_category_id"];
const rows = categories.map((category) => [
    category.id.toString(),
    category.name,
    category.parent_category_id ? category.parent_category_id.toString() : "None"
]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <Table headers={headers} rows={rows} />
    </div>
  );
}
