import { Request, Response } from "express";
import { validationResult } from "express-validator";

class AdminAuth {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
  }
}

export default new AdminAuth();
