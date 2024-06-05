import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import { UserValidator } from "../validations";
import { UserController } from "../controllers/admin";

const api = Router();

api.use("/admin", AdminMiddleware);
api.post("/admin/categories", UserValidator, UserController.store);

export { api };
