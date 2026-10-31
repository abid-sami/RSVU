import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ComponentModel from "@/models/Component";
import { componentsList } from "@/data/componentsData";

// GET /api/components - Retrieve all components
export async function GET() {
  try {
    await connectToDatabase();

    let components = await ComponentModel.find().sort({ createdAt: -1 });

    // Auto-seed if database is currently empty
    if (components.length === 0 && componentsList.length > 0) {
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

      await ComponentModel.insertMany(seedData);
      components = await ComponentModel.find().sort({ createdAt: -1 });
    }

    return NextResponse.json({
      success: true,
      count: components.length,
      data: components,
    });
  } catch (error: any) {
    console.error("GET /api/components error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch components from database",
      },
      { status: 500 }
    );
  }
}

// POST /api/components - Add a new component
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: "Name and Category are required" },
        { status: 400 }
      );
    }

    const quantity = Number(body.quantity) || 1;
    const availableQuantity =
      body.availableQuantity !== undefined
        ? Number(body.availableQuantity)
        : quantity;

    let status = body.status;
    if (!status) {
      if (availableQuantity <= 0) status = "Out of Stock";
      else if (availableQuantity <= 3) status = "Limited";
      else status = "In Stock";
    }

    const newComponent = await ComponentModel.create({
      name: body.name.trim(),
      model: body.model ? body.model.trim() : "",
      category: body.category,
      status,
      quantity,
      availableQuantity,
      location: body.location ? body.location.trim() : "Robotics Lab",
      specs: Array.isArray(body.specs) ? body.specs : [],
      image: body.image || "",
      borrowable: body.borrowable !== undefined ? Boolean(body.borrowable) : true,
      notes: body.notes || "",
    });

    return NextResponse.json(
      {
        success: true,
        data: newComponent,
        message: "Component added successfully to MongoDB",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/components error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create component in database",
      },
      { status: 500 }
    );
  }
}
