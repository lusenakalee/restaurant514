import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_components/ProductActions";
import { MoreVertical } from "lucide-react"; // Added correct import for the icon

type FoodItemData = {
  id: string;
  name: string;
  price: number;
};

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Menu</PageHeader>
        <Button asChild>
          <Link href="/admin/menu/new">Add Food Item</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const foodItems: FoodItemData[] = await db.foodItem.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
    orderBy: { name: "asc" },
  });

  if (foodItems.length === 0) return <p>No food items found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foodItems.map((foodItem) => (
          <TableRow key={foodItem.id}>
            <TableCell>{foodItem.name}</TableCell>
            <TableCell>{formatCurrency(foodItem.price)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/menu/${foodItem.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={foodItem.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
