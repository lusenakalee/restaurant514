import Link from "next/link";
import { PageHeader } from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    //   _count: {
    //     select: { foodItems: true },
    //   },
    },
  });

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Categories</PageHeader>
        <Button asChild>
          <Link href="/admin/categories/new">Add Category</Link>
        </Button>
      </div>

      {categories.length === 0 ? (
        <p className="mt-6 text-gray-600">No categories found.</p>
      ) : (
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Food Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  {/* <TableCell>{category._count.foodItems}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
