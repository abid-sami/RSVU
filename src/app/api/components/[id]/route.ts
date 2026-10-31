import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ComponentModel from "@/models/Component";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Helper to find by _id or fallback
async function findComponentById(id: string) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return await ComponentModel.findById(id);
  }
  return null;
}

// GET /api/components/[id]
export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const component = await findComponentById(id);
    if (!component) {
      return NextResponse.json(
        { success: false, error: "Component not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: component });
  } catch (error: any) {
    console.error("GET /api/components/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch component" },
      { status: 500 }
    );
  }
}

// PUT /api/components/[id] - Update a component
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const component = await findComponentById(id);
    if (!component) {
      return NextResponse.json(
        { success: false, error: "Component not found" },
        { status: 404 }
      );
    }

    if (body.name !== undefined) component.name = body.name.trim();
    if (body.model !== undefined) component.model = body.model.trim();
    if (body.category !== undefined) component.category = body.category;
    if (body.location !== undefined) component.location = body.location.trim();
    if (body.image !== undefined) component.image = body.image;
    if (body.specs !== undefined) component.specs = Array.isArray(body.specs) ? body.specs : [];
    if (body.borrowable !== undefined) component.borrowable = Boolean(body.borrowable);
    if (body.notes !== undefined) component.notes = body.notes;

    if (body.quantity !== undefined) {
      component.quantity = Number(body.quantity);
    }

    if (body.availableQuantity !== undefined) {
      component.availableQuantity = Number(body.availableQuantity);
    }

    // Auto-update status if not explicitly given
    if (body.status !== undefined) {
      component.status = body.status;
    } else {
      if (component.availableQuantity <= 0) component.status = "Out of Stock";
      else if (component.availableQuantity <= 3) component.status = "Limited";
      else component.status = "In Stock";
    }

    const updated = await component.save();

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Component updated successfully",
    });
  } catch (error: any) {
    console.error("PUT /api/components/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update component" },
      { status: 500 }
    );
  }
}

// DELETE /api/components/[id] - Remove a component
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const component = await findComponentById(id);
    if (!component) {
      return NextResponse.json(
        { success: false, error: "Component not found" },
        { status: 404 }
      );
    }

    await component.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Component deleted successfully from MongoDB",
    });
  } catch (error: any) {
    console.error("DELETE /api/components/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete component" },
      { status: 500 }
    );
  }
}
