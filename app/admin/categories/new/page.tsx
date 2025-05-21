import React from 'react'
import { PageHeader } from '../../_components/PageHeader'
import CategoryForm from '../_components/CategoryForm'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import db from "@/db/db";

export default function page() {
    async function createCategory(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;

    await db.category.create({
      data: { name },
    });

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
  }

  return (
    <div>
      <PageHeader>Add Category</PageHeader>
      <CategoryForm onSubmit={createCategory} pending={false} /> {/* Pass the default category */}
    </div>
  )
}
