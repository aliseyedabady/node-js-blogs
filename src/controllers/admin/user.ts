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
      const user = await DBService.insert({
        model: User,
        data: {
          username,
          password: hashedPassword,
          name,
          email,
        },
      });
      delete user.password;
      ResponseHandler.success(res, user);
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async get(req: Request, res: Response) {
    try {
      const users = await DBService.get({
        model: User,
        req,
        filters: ["name"],
      });
      ResponseHandler.success(res, users);
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async find(req: Request, res: Response) {
    try {
      const user = await DBService.getById({ model: User, id: req.params.id });
      if (user) {
        ResponseHandler.success(res, user);
      } else {
        ResponseHandler.notFound(res);
      }
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const user = await DBService.update({
        model: User,
        id: req.params.id,
        data: req.body,
      });
      if (user) {
        ResponseHandler.success(res, user);
      } else {
        ResponseHandler.notFound(res);
      }
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const user = await DBService.delete({ id: req.params.id, model: User });
      if (user) {
        ResponseHandler.success(res);
      } else {
        ResponseHandler.notFound(res);
      }
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
}

export default new UserController();
