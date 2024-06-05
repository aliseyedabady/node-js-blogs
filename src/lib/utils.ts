import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  jwtExpiresIn,
  jwtRefreshExpiresIn,
  jwtSecret,
  saltRounds,
} from "./constants";
import { User } from "../models";

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
