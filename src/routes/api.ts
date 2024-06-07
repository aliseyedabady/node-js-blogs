import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import {
  adminLoginValidation,
  adminSignupValidation,
  userValidation,
} from "../validations";
import { AuthController, UserController } from "../controllers/admin";
import * as dotenv from "dotenv";

dotenv.config();

const api = Router();
api.use("/admin/login", adminLoginValidation, AuthController.login);
if (process.env.MODE === "development") {
  api.use("/admin/signup", adminSignupValidation, AuthController.signUp);
}
api.use("/admin", AdminMiddleware);
api.use("/admin/refresh", AuthController.refresh);
api.post("/admin/users", userValidation, UserController.store);
api.get("/admin/users", userValidation, UserController.get);
api.get("/admin/users/:id", userValidation, UserController.find);

export { api };
