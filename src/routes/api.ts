import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import {
  adminLoginValidation,
  adminSignupValidation,
  categoryValidation,
  commentValidation,
  userValidation,
} from "../validations";
import {
  AuthController,
  BlogController,
  CategoryController,
  UserController,
} from "../controllers/admin";
import * as dotenv from "dotenv";
import upload from "../lib/upload";
import { blogValidation } from "../validations/blogValidation";
import { UserCommentController } from "../controllers/user";

dotenv.config();

const api = Router();
api.use("/admin/login", adminLoginValidation, AuthController.login);
if (process.env.MODE === "development") {
  api.use("/admin/signup", adminSignupValidation, AuthController.signUp);
}

api.use("/comment/store", commentValidation, UserCommentController.store);

api.use("/admin", AdminMiddleware);
api.use("/admin/refresh", AuthController.refresh);

api.post("/admin/users", userValidation, UserController.store);
api.get("/admin/users", UserController.get);
api.get("/admin/users/:id", UserController.find);
api.put("/admin/users/:id", UserController.update);
api.delete("/admin/users/:id", UserController.remove);

api.post(
  "/admin/categories",
  upload.single("image"),
  categoryValidation,
  CategoryController.store
);
api.get("/admin/categories", CategoryController.get);
api.get("/admin/categories/:id", CategoryController.find);
api.put("/admin/categories/:id", CategoryController.update);
api.delete("/admin/categories/:id", CategoryController.remove);

api.post(
  "/admin/blogs",
  upload.single("image"),
  blogValidation,
  BlogController.store
);
api.get("/admin/blogs", BlogController.get);
api.get("/admin/blogs/:id", BlogController.find);
api.put("/admin/blogs/:id", upload.single("image"), BlogController.update);
api.delete("/admin/blogs/:id", BlogController.remove);

export { api };
