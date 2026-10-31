import mongoose, { Schema, Model } from "mongoose";

export interface IComponent {
  name: string;
  model: string;
  category: "Microcontrollers" | "Sensors" | "Motors & Drivers" | "Power & Battery" | "Wireless & IoT" | "Chassis & Hardware";
  status: "In Stock" | "Limited" | "Reserved" | "Out of Stock";
  quantity: number;
  availableQuantity: number;
  location: string;
  specs: string[];
  image: string;
  borrowable: boolean;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ComponentSchema = new Schema<IComponent>(
  {
    name: {
      type: String,
      required: [true, "Component name is required"],
      trim: true,
    },
    model: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Microcontrollers",
        "Sensors",
        "Motors & Drivers",
        "Power & Battery",
        "Wireless & IoT",
        "Chassis & Hardware",
      ],
      default: "Microcontrollers",
    },
    status: {
      type: String,
      enum: ["In Stock", "Limited", "Reserved", "Out of Stock"],
      default: "In Stock",
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
      default: 1,
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: [0, "Available quantity cannot be negative"],
      default: function (this: any) {
        return this.quantity ?? 1;
      },
    },
    location: {
      type: String,
      default: "Robotics Lab Cabinet A",
      trim: true,
    },
    specs: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    borrowable: {
      type: Boolean,
      default: true,
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

// Prevent re-compilation of model in Next.js development hot-reload
const ComponentModel: Model<IComponent> =
  mongoose.models.Component || mongoose.model<IComponent>("Component", ComponentSchema);

export default ComponentModel;
