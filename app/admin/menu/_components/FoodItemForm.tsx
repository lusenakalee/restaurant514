import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/db/db";

type FoodItemFormProps = {
  onSubmit?: (formData: FormData) => Promise<void>; // Optional: use if editing
  foodItem?: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
  }; // Optional: if provided, we are editing
  pending?: boolean;
};

export default async function FoodItemForm({
  onSubmit,
  foodItem,
  pending = false,
}: FoodItemFormProps) {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  async function createFoodItem(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = formData.get("categoryId") as string;

    if (!name || !description || isNaN(price) || !categoryId) {
      throw new Error("All fields are required.");
    }

    await db.foodItem.create({
      data: {
        name,
        description,
        price,
        categoryId,
      },
    });

    revalidatePath("/admin/menu");
    redirect("/admin/menu");
  }

  const isEditing = !!foodItem;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Food Item" : "Create New Food Item"}
      </h1>
      <form action={onSubmit ?? createFoodItem} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Grilled Chicken"
            defaultValue={foodItem?.name}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a brief description..."
            rows={4}
            defaultValue={foodItem?.description}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg mb-2">
            Price (Aud)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            defaultValue={foodItem?.price}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-lg mb-2">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={foodItem?.categoryId ?? ""}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isEditing ? "Update Food Item" : "Create Food Item"}
        </button>
      </form>
    </div>
  );
}
