import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";
dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port({ default: 4000 }),
  DATABASE_URL: str(),
});
