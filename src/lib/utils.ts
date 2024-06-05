import { jwtExpiresIn, jwtRefreshExpiresIn, jwtSecret } from "./constants";
import jwt from "jsonwebtoken";

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
