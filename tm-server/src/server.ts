import { createApp } from "./app.js";
import { connectToDb } from "./config/db.connect.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { connectRedis } from "./config/redis.connect.js";

export const start = async () => {
  try {
    await Promise.all([connectToDb(), connectRedis()]);
    const app = await createApp();
    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error("Something went wrong while connecting server", error);
  }
};

start();
