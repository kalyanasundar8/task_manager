import type { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { redis } from "../../config/redis.connect.js";

export class AuthController {
  static createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData = req.body;
      const user = await AuthService.createUser(userData);

      res.cookie("access-token", user.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 2 * 60,
      });

      res.cookie("refresh-token", user.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 60,
      });

      const session = {
        userId: user.user.id,
        refreshToken: user.refreshToken,
        date: Date.now(),
      };

      await redis.setEx(`session:${user.user.id}`, 7 * 60, JSON.stringify(session));

      res.status(201).json({ message: "User created", response: user });
    } catch (error) {
      next(error);
    }
  };

  static signinUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData = req.body;
      const user = await AuthService.signinUser(userData);

      // console.log("User", user);

      res.cookie("access-token", user?.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 2 * 60,
      });

      res.cookie("refresh-token", user?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 60 * 1000,
      });

      const session = {
        userId: user?.userExists.id,
        refreshToken: user?.refreshToken,
        date: Date.now(),
      };

      await redis.setEx(
        `session:${user?.userExists.id}`,
        7 * 60,
        JSON.stringify(session),
      );

      res.status(200).json({
        message: "SignedIn successfuly",
        response: { userId: user?.userExists.id },
      });
    } catch (error) {
      next(error);
    }
  };

  static refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const sessionData = await redis.get("session");
      // console.log("Session data: ", sessionData);

      if (!sessionData) {
        res.status(401).json({
          message: "Unauthorized",
        });
      }

      const data = JSON.parse(sessionData as string);

      const user = await AuthService.refreshtoken(
        data.userId,
        data.refreshToken,
      );

      if (!user) {
        res.status(401).json({
          message: "Unauthorized",
        });
      }

      res.cookie("access-token", user?.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 2 * 60,
      });

      res.status(200).json({
        message: "Token refreshed",
      });
    } catch (error) {
      next(error);
    }
  };
}
