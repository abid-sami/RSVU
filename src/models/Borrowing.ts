import mongoose, { Schema, Model } from "mongoose";

export type BorrowingStatus = "borrowed" | "returned";

export interface IBorrowing {
  borrowerName: string;
  studentId: string;
  semester: number;
  section: string;
  componentId: string;
  componentName: string;
  quantity: number;
  givenDate: string;
  returnedDate?: string;
  status: BorrowingStatus;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BorrowingSchema = new Schema<IBorrowing>(
  {
    borrowerName: {
      type: String,
      required: [true, "Borrower name is required"],
      trim: true,
    },
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      trim: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
      default: 1,
    },
    section: {
      type: String,
      required: true,
      trim: true,
      default: "A",
    },
    componentId: {
      type: String,
      required: [true, "Component ID is required"],
    },
    componentName: {
      type: String,
      required: [true, "Component name is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    givenDate: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split("T")[0],
    },
    returnedDate: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const BorrowingModel: Model<IBorrowing> =
  mongoose.models.Borrowing || mongoose.model<IBorrowing>("Borrowing", BorrowingSchema);

export default BorrowingModel;
