import { PageHeader } from "../../_components/PageHeader";
import FoodItemForm from "../_components/FoodItemForm";
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewFoodItemPage() {
  async function createFoodItem(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
     const price =  parseFloat(formData.get("price") as string);
    const categoryId = formData.get("categoryId") as string;

    await db.foodItem.create({
      data: {
        name,
        description,
        categoryId,
        price,
      },
    });

    revalidatePath("/admin/menu");
    redirect("/admin/menu");
  }

  return (
    <div className="min-h-screen pb-12 relative">
      <PageHeader>Add Product</PageHeader>
      <FoodItemForm onSubmit={createFoodItem} pending={false} />
    </div>
  );
}
