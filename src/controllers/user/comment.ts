import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";
import DBService from "../../lib/DBService";
import Comment from "../../models/Comment";

class UserCommentController {
  async store(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
      const comment = await DBService.insert({
        model: Comment,
        data: { ...req.body, status: "inactive" },
      });
      ResponseHandler.success(res, comment);
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
}
export default new UserCommentController();
