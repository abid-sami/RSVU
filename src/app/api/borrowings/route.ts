import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BorrowingModel from "@/models/Borrowing";
import ComponentModel from "@/models/Component";
import mongoose from "mongoose";

// GET /api/borrowings - Retrieve all borrowing checkout logs
export async function GET() {
  try {
    await connectToDatabase();
    const borrowings = await BorrowingModel.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: borrowings.length,
      data: borrowings,
    });
  } catch (error: any) {
    console.error("GET /api/borrowings error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch borrowings" },
      { status: 500 }
    );
  }
}

// POST /api/borrowings - Create a new component checkout and decrement availableQuantity
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const {
      borrowerName,
      studentId,
      semester,
      section,
      componentId,
      componentName,
      quantity = 1,
      givenDate,
      notes,
    } = body;

    if (!borrowerName || !studentId || !componentId) {
      return NextResponse.json(
        { success: false, error: "Borrower Name, Student ID, and Component are required." },
        { status: 400 }
      );
    }

    // Create the borrowing record
    const borrowing = await BorrowingModel.create({
      borrowerName: borrowerName.trim(),
      studentId: studentId.trim(),
      semester: Number(semester) || 1,
      section: section || "A",
      componentId,
      componentName: componentName || "Hardware Component",
      quantity: Number(quantity) || 1,
      givenDate: givenDate || new Date().toISOString().split("T")[0],
      status: "borrowed",
      notes: notes || "",
    });

    // Automatically decrement availableQuantity on the Component in MongoDB
    if (mongoose.Types.ObjectId.isValid(componentId)) {
      const comp = await ComponentModel.findById(componentId);
      if (comp) {
        comp.availableQuantity = Math.max(0, comp.availableQuantity - (Number(quantity) || 1));
        if (comp.availableQuantity === 0) comp.status = "Out of Stock";
        else if (comp.availableQuantity <= 3) comp.status = "Limited";
        await comp.save();
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: borrowing,
        message: "Component checked out successfully and stock updated in MongoDB.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/borrowings error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to log borrowing checkout" },
      { status: 500 }
    );
  }
}
