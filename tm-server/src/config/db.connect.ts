import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

export const connectToDb = async () => {
  const URL = env.DATABASE_URL;
  try {
    await mongoose.connect(URL);
    logger.info("Database connected successfuly ✨");
  } catch (error) {
    logger.error("Unable to conncet database: ", error);
  }
};
