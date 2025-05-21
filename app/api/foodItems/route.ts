import db from '@/db/db';
import { NextResponse } from 'next/server';

// GET: Fetch all foodItems
export async function GET() {
  try {
    console.log("Starting the GET request to fetch all foodItems...");

    const foodItems = await db.foodItem.findMany({
      include: {
        category: true, // Include related category
      },
    });

    if (foodItems.length === 0) {
      console.log("No foodItems found.");
    }

  

    // Return foodItems in the response
    return NextResponse.json({ success: true, data: foodItems });
  } catch  (error: unknown){
    let message = "An unexpected error occurred";

    if (error instanceof Error) {
      message = error.message;
    }

    console.error('Error fetching foodItems:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}