"use server"

import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import db from "@/db/db"


// Schema for adding products
const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().min(1),
})

// Add product function
export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  // Perform the POST request to /api/products
  const res = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    body: formData,
  })

  const data = await res.json()

  if (!data.success) {
    return { ...data.error }
  }

  revalidatePath("/")
  revalidatePath("/menu")

  redirect("/admin/menu")
}

// Schema for updating menu
const editSchema = addSchema.extend({

})

// Update product function
export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  // Perform the POST request to /api/products
  const res = await fetch(`/api/products/${id}`, {
    method: "PATCH",
    body: formData,
  })

  const data = await res.json()

  if (!data.success) {
    return { ...data.error }
  }

  revalidatePath("/")
  revalidatePath("/menu")

  redirect("/admin/menu")
}


export async function deleteFoodItem(id: string) {
  const product = await db.foodItem.findUnique({
    where: { id }
  })

  if (product == null) return notFound()

  await db.foodItem.delete({ where: { id } })

  revalidatePath("/")
  revalidatePath("/menu")
}