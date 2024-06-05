import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";
import bcrypt from "bcrypt";
import knex from "../../lib/db";
import jwt from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../../lib/constants";
import { User } from "../../models";

class AdminAuth {
  async login(req: Request, res: Response) {}

  async signUp(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
      const { username, password, name, email } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
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
}

export default new AdminAuth();
