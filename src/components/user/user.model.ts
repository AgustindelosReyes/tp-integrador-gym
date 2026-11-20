import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  password: string; // acá se guarda el HASH, nunca la contraseña real
  role: "user" | "admin";
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = model<IUser>("User", userSchema);