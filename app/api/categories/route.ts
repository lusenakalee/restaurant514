// app/api/categories/route.ts
import db from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await db.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(categories);
}
