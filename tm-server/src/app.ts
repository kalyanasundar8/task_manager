import express, { type NextFunction, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { logger } from "./config/logger.js";
import authRoute from "./modules/auth/auth.route.js";
import taskRoute from "./modules/tasks/task.route.js";
import parser from "cookie-parser";

export const createApp = async () => {
  const app = express();

  app.use(express.json());
  app.use(parser());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: process.env.ORIGIN || "*" }));
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(
    morgan("dev", { stream: { write: (msg) => logger.info(msg.trim()) } }),
  );

  app.use("/api/auth", authRoute);
  app.use("/api/task", taskRoute);

  return app;
};
