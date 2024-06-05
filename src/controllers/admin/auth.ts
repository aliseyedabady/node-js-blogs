import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";

class AdminAuth {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }

    const { username, password } = req.body;
  }
  async signUp(req: Request, res: Response) {}
}

export default new AdminAuth();
