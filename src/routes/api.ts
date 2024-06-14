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
  AdminCommentController,
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

api.use(
  "/comment",
  upload.none(),
  commentValidation,
  UserCommentController.store
);

api.use("/admin", AdminMiddleware);
api.use("/admin/refresh", AuthController.refresh);

api.post("/admin/users", upload.none(), userValidation, UserController.store);
api.get("/admin/users", upload.none(), UserController.get);
api.get("/admin/users/:id", upload.none(), UserController.find);
api.put("/admin/users/:id", upload.none(), UserController.update);
api.delete("/admin/users/:id", upload.none(), UserController.remove);

api.post(
  "/admin/categories",
  upload.single("image"),
  categoryValidation,
  CategoryController.store
);
api.get("/admin/categories", upload.none(), CategoryController.get);
api.get("/admin/categories/:id", upload.none(), CategoryController.find);
api.put("/admin/categories/:id", upload.none(), CategoryController.update);
api.delete("/admin/categories/:id", upload.none(), CategoryController.remove);

api.post(
  "/admin/blogs",
  upload.single("image"),
  blogValidation,
  BlogController.store
);
api.get("/admin/blogs", BlogController.get);
api.get("/admin/blogs/:id", upload.none(), BlogController.find);
api.put("/admin/blogs/:id", upload.single("image"), BlogController.update);
api.delete("/admin/blogs/:id", upload.none(), BlogController.remove);

api.get("/admin/comments", AdminCommentController.get);
api.get("/admin/comments/:id", upload.none(), AdminCommentController.find);
api.put("/admin/comments/:id", AdminCommentController.update);
api.delete("/admin/comments/:id", upload.none(), AdminCommentController.remove);

export { api };
