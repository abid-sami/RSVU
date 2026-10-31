import mongoose, { Schema, Model } from "mongoose";

export interface ILoginAttempt {
  identifier: string; // Normalized lowercase email
  attempts: number;
  lockedUntil: Date | null;
  lastAttemptAt: Date;
}

const LoginAttemptSchema = new Schema<ILoginAttempt>(
  {
    identifier: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    lockedUntil: {
      type: Date,
      default: null,
    },
    lastAttemptAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const LoginAttemptModel: Model<ILoginAttempt> =
  mongoose.models.LoginAttempt ||
  mongoose.model<ILoginAttempt>("LoginAttempt", LoginAttemptSchema);

export default LoginAttemptModel;
