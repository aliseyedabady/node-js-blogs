import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import { AdminLoginValidation, UserValidator } from "../validations";
import { AuthController, UserController } from "../controllers/admin";

const api = Router();

api.use("/admin/login", AdminLoginValidation, AuthController.login);
api.use("/admin", AdminMiddleware);
api.post("/admin/categories", UserValidator, UserController.store);

export { api };
