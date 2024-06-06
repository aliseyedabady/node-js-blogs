import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtExpiresIn, jwtSecret } from "../../lib/constants";
import { User } from "../../models";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../../lib/utils";

class AdminAuth {
  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseHandler.validationError(res, errors);
      }
      const { username, password } = req.body;
      const user = await User.query().findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return ResponseHandler.success(res, { accessToken, refreshToken });
      }
      return ResponseHandler.notFound(res, "نام کاربری یا رمز عبور اشتباه است");
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }

  async signUp(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
      const { username, password, name, email } = req.body;

      const hashedPassword = await hashPassword(password);
      const user = await User.query().insert({
        username,
        password: hashedPassword,
        role: "admin",
        name,
        email,
      });
      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: jwtExpiresIn,
      });

      ResponseHandler.success(res, { token });
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) return ResponseHandler.unauthorized(res);

    jwt.verify(refreshToken, jwtSecret, (err: any, user: any) => {
      if (err) return ResponseHandler.unauthorized(res);
      const newAccessToken = generateAccessToken(user);
      ResponseHandler.success(res, { accessToken: newAccessToken });
    });
  }
}

export default new AdminAuth();
