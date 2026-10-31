import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ComponentModel from "@/models/Component";
import { componentsList } from "@/data/componentsData";

// POST /api/components/seed - Seed default components into MongoDB
export async function POST() {
  try {
    await connectToDatabase();

    // Check if components already exist
    const count = await ComponentModel.countDocuments();
    if (count > 0) {
      return NextResponse.json({
        success: true,
        message: `Database already contains ${count} components. If you wish to overwrite, delete them first.`,
        count,
      });
    }

    const seedData = componentsList.map((item) => ({
      name: item.name,
      model: item.model || "",
      category: item.category,
      status: item.status,
      quantity: item.quantity,
      availableQuantity: item.availableQuantity,
      location: item.location,
      specs: item.specs || [],
      image: item.image,
      borrowable: item.borrowable ?? true,
      notes: item.notes || "",
    }));

    const result = await ComponentModel.insertMany(seedData);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.length} components into MongoDB.`,
      count: result.length,
    });
  } catch (error: any) {
    console.error("POST /api/components/seed error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to seed components" },
      { status: 500 }
    );
  }
}
