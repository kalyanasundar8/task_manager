import { Types } from "mongoose";
import { redis } from "../../config/redis.connect.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generate.token.js";
import Auth from "./auth.schema.js";
import type { IAuth, IAuthLogin } from "./auth.types.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export class AuthService {
  static createUser = async (data: IAuth) => {
    try {
      const { email, password } = data;

      const userExists = await Auth.findOne({ email: email });

      if (userExists) {
        throw new Error("User already exists!");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await Auth.create({ ...data, password: hashedPassword });

      const accessToken = await generateAccessToken(user._id);
      const refreshToken = await generateRefreshToken(user._id);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log("Create user error: ", error);
      throw new Error("Unable to create user");
    }
  };

  static signinUser = async (data: IAuthLogin) => {
    try {
      const { email, password } = data;

      const userExists = await Auth.findOne({ email: email });

      // console.log("User exists:", userExists);

      if (!userExists) {
        throw new Error("User not exists");
      }

      const comparedPassword = await bcrypt.compare(
        password,
        userExists.password,
      );

      if (!comparedPassword) {
        throw new Error("Password invalid");
      }

      const accessToken = await generateAccessToken(userExists._id);
      const refreshToken = await generateRefreshToken(userExists._id);

      return {
        userExists,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error("Unable to signin user");
    }
  };

  static refreshtoken = async (userId: string, refreshToken: string) => {
    try {
      console.log("UserId", userId);
      console.log("Refresh", refreshToken);
      const decoded = JWT.verify(
        refreshToken,
        process.env.SECRET_KEY as string,
      ) as { id: string };

      const storedToken = await redis.get(`session`);

      console.log(storedToken);

      if (!storedToken || storedToken != refreshToken) {
        throw new Error("Invalid or expired token");
      }

      const newAccessToken = await generateAccessToken(
        new Types.ObjectId(decoded.id),
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error("Unable to refresh token");
    }
  };
}
