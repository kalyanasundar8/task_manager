import JWT from "jsonwebtoken";
import type { Types } from "mongoose";

export const generateRefreshToken = (id: Types.ObjectId) => {
  return JWT.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: "7m",
  });
};

export const generateAccessToken = (id: Types.ObjectId) => {
  return JWT.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: "2m",
  });
};
