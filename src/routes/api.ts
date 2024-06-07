import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import {
  adminLoginValidation,
  adminSignupValidation,
  categoryValidation,
  userValidation,
} from "../validations";
import {
  AuthController,
  CategoryController,
  UserController,
} from "../controllers/admin";
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
api.get("/admin/users", UserController.get);
api.get("/admin/users/:id", UserController.find);
api.put("/admin/users/:id", UserController.update);
api.delete("/admin/users/:id", UserController.remove);

api.post("/admin/categories", categoryValidation, CategoryController.store);
api.get("/admin/categories", CategoryController.get);
api.get("/admin/categories/:id", CategoryController.find);
api.put("/admin/categories/:id", CategoryController.update);
api.delete("/admin/categories/:id", CategoryController.remove);

export { api };
