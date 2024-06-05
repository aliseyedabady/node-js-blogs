import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";
import { hashPassword } from "../../lib/utils";
import { User } from "../../models";
import DBService from "../../lib/DBService";

class UserController {
  async store(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
      const { username, password, name, email } = req.body;

      const hashedPassword = await hashPassword(password);
      const user = await DBService.insertData(User, {
        username,
        password: hashedPassword,
        name,
        email,
      });
      ResponseHandler.success(res, user);
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
}

export default new UserController();
