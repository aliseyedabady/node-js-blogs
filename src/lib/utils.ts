import bcrypt from "bcrypt";
import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { Model } from "objection";
import { User } from "../models";
import * as fs from "fs";
import {
  jwtExpiresIn,
  jwtRefreshExpiresIn,
  jwtSecret,
  saltRounds,
} from "./constants";
import { promisify } from "util";
import path from "path";

export const generateAccessToken = (user: User) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn,
    }
  );
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: jwtRefreshExpiresIn,
  });
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

type TCheckUnique = {
  value: string;
  model: typeof Model;
  message: string;
  key: string;
};

export const checkUnique = async ({
  value,
  model,
  key,
  message,
}: TCheckUnique) => {
  if (value) {
    const result = await model.query().findOne({ [key]: value });
    if (result) {
      return Promise.reject(message);
    }
  }
};

type TCheckExist = {
  model: typeof Model;
  message: string;
  id: string;
};

export const checkExist = async ({ model, id, message }: TCheckExist) => {
  if (id) {
    const result = await model.query().findById(id);
    if (!result) {
      return Promise.reject(message);
    }
  }
};

export interface Route {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  middleware?: Array<(req: Request, res: Response, next: NextFunction) => void>;
  handler: (req: Request, res: Response) => void;
}
export const deleteFile = (filePath: string) => {
  const unlinkAsync = promisify(fs.unlink);
  unlinkAsync(path.join(__dirname + `../../uploads/1717951296270.png`))
    .then(() => {
      console.log("File deleted successfully");
    })
    .catch((err: NodeJS.ErrnoException) => {
      console.error(`Error deleting file: ${err.message}`);
    });
};

export const getFileName = (filePath: string): string => {
  const parts = filePath.split("/");
  return parts[parts.length - 1];
};
