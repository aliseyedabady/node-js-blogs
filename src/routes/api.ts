import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import {
  AdminLoginValidation,
  AdminSignupValidation,
  UserValidator,
} from "../validations";
import { AuthController, UserController } from "../controllers/admin";
import * as dotenv from "dotenv";

dotenv.config();

const api = Router();
api.use("/admin/login", AdminLoginValidation, AuthController.login);
if (process.env.MODE === "development") {
  api.use("/admin/signup", AdminSignupValidation, AuthController.signUp);
}
api.use("/admin", AdminMiddleware);
api.use("/admin/refresh", AuthController.refresh);
api.post("/admin/categories", UserValidator, UserController.store);

export { api };
