import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  jwtExpiresIn,
  jwtRefreshExpiresIn,
  jwtSecret,
  saltRounds,
  translateErrorMessage,
} from "./constants";
import { User } from "../models";
import { Model } from "objection";

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
  const result = await model.query().findOne({ [key]: value });
  if (result) {
    return Promise.reject(message);
  }
};
