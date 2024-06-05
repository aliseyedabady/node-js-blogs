import { Request } from "express";

export type TUser = { role: "admin" | "user" };

export interface RequestUser extends Request {
  user?: TUser;
}
