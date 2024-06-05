import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  jwtExpiresIn,
  jwtRefreshExpiresIn,
  jwtSecret,
  saltRounds,
} from "./constants";

export const generateAccessToken = (user: any) => {
  return jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: jwtRefreshExpiresIn,
  });
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};
