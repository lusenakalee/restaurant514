import db from "@/db/db";
import { NextResponse } from "next/server";

// GET: Fetch all categories and their subcategories
export async function GET() {
  try {
    console.log("Starting the GET request to fetch all categories...");

    const categories = await db.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    if (categories.length === 0) {
      console.log("No categories found.");
    }

    // Return categories in the response
    return NextResponse.json({ success: true, data: categories });
  } catch (error: unknown) {
    let message = "An unexpected error occurred";

    if (error instanceof Error) {
      message = error.message;
    }

    console.error("Error fetching foodItems:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
