import express from "express";
import { AuthController } from "./auth.controller.js";

const authRoute = express.Router();

authRoute.post("/", AuthController.createUser);
authRoute.post("/signin", AuthController.signinUser);
authRoute.post("/refresh", AuthController.refreshToken);

export default authRoute;
