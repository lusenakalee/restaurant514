import db from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import FoodItemForm from "../../_components/FoodItemForm";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
      const { id } = await params;


  const foodItem = await db.foodItem.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!foodItem) return notFound();

  async function updateFoodItem(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = formData.get("categoryId") as string;

    await db.foodItem.update({
      where: { id },
      data: { name, description, categoryId, price },
    });

    revalidatePath("/admin/menu");
    redirect("/admin/menu");
  }

  return (
    <>
      <PageHeader>Edit Food Item</PageHeader>
      <FoodItemForm
        onSubmit={updateFoodItem}
        foodItem={{
          name: foodItem.name,
          description: foodItem.description,
          price: foodItem.price,
          categoryId: foodItem.categoryId ?? "",
        }}
        pending={false}
      />
    </>
  );
}
