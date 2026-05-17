import { model, Schema } from "mongoose";
import type { IAuth } from "./auth.types.js";

const authSchema = new Schema<IAuth>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Auth = model<IAuth>("auth", authSchema);
export default Auth;
