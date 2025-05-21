import db from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import CategoryForm from "../../_components/CategoryForm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;



  const category = await db.category.findUnique({
    where: { id },
  });

  if (!category) {
    return (
      <>
        <PageHeader>Category Not Found</PageHeader>
        <p>The category with ID <code>{id}</code> does not exist.</p>
      </>
    );
  }

  async function updateCategory(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;

    await db.category.update({
      where: { id },
      data: { name },
    });

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
  }

  return (
    <>
      <PageHeader>Edit Category</PageHeader>
      <CategoryForm
        onSubmit={updateCategory}
        pending={false}
        initialValues={{ name: category.name }}
      />
    </>
  );
}
