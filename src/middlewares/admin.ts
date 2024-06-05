import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestUser } from "./type";

export const AdminMiddleware = (
  request: RequestUser,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;
  if (token) {
    jwt.verify(
      token.split(" ")[1],
      "secretKey",
      (error: any, decoded: any): void => {
        if (error) {
          response.sendStatus(401);
        } else {
          if (decoded && decoded.user && decoded.user.role === "admin") {
            request.user = decoded.user;
            next();
          } else {
            response.sendStatus(401);
          }
        }
      }
    );
  } else {
    response.sendStatus(401);
  }
};
