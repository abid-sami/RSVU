import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BorrowingModel from "@/models/Borrowing";
import ComponentModel from "@/models/Component";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/borrowings/[id] - Mark component as returned and restore component stock
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    let borrowing = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      borrowing = await BorrowingModel.findById(id);
    }

    if (!borrowing) {
      return NextResponse.json(
        { success: false, error: "Borrowing record not found" },
        { status: 404 }
      );
    }

    const wasAlreadyReturned = borrowing.status === "returned";
    borrowing.status = body.status || "returned";
    borrowing.returnedDate =
      body.returnedDate || new Date().toISOString().split("T")[0];

    if (body.notes !== undefined) {
      borrowing.notes = body.notes;
    }

    await borrowing.save();

    // If it is just now marked returned, increment availableQuantity on Component
    if (!wasAlreadyReturned && borrowing.status === "returned") {
      if (mongoose.Types.ObjectId.isValid(borrowing.componentId)) {
        const comp = await ComponentModel.findById(borrowing.componentId);
        if (comp) {
          comp.availableQuantity = Math.min(
            comp.quantity,
            comp.availableQuantity + (borrowing.quantity || 1)
          );
          if (comp.availableQuantity > 3) comp.status = "In Stock";
          else if (comp.availableQuantity > 0) comp.status = "Limited";
          await comp.save();
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: borrowing,
      message: "Component marked as returned and inventory restored.",
    });
  } catch (error: any) {
    console.error("PUT /api/borrowings/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update borrowing status" },
      { status: 500 }
    );
  }
}

// DELETE /api/borrowings/[id] - Delete a borrowing log
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      await BorrowingModel.findByIdAndDelete(id);
    }

    return NextResponse.json({
      success: true,
      message: "Borrowing record deleted successfully.",
    });
  } catch (error: any) {
    console.error("DELETE /api/borrowings/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete borrowing record" },
      { status: 500 }
    );
  }
}
