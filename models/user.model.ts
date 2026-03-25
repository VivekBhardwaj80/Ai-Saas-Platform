import { Schema, model, models, Types } from "mongoose";

type userRole = "user" | "admin";

export interface IUser {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role: userRole;
  interview: Types.ObjectId;
  createdAt:Date,
  updatedAt:Date
}

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    interview: [
      {
        type: Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  { timestamps: true },
);
const User = models.User || model<IUser>("User", userSchema);
export default User;
