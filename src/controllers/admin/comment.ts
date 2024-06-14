import { Request, Response } from "express";
import DBService from "../../lib/DBService";
import Comment from "../../models/Comment";
import ResponseHandler from "../../lib/ResponseHandler";

class AdminCommentController {
  async get(req: Request, res: Response) {
    try {
      const comments = await DBService.get({
        model: Comment,
        req,
        filters: ["name"],
        withRelation: ["blog"],
      });
      return ResponseHandler.success(res, comments);
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async find(req: Request, res: Response) {
    try {
      const comment = await DBService.getById({
        model: Comment,
        id: req.params.id,
        withRelation: ["blog", "replies"],
      });
      if (comment) {
        ResponseHandler.success(res, comment);
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
      const comment = await DBService.update({
        model: Comment,
        id: req.params.id,
        data: req.body,
      });
      console.log({ comment });
      if (comment) {
        ResponseHandler.success(res, comment);
      } else {
        ResponseHandler.notFound(res);
      }
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async remove(req: Request, res: Response) {
    try {
      const comment = await DBService.delete({
        id: req.params.id,
        model: Comment,
      });
      if (comment) {
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

export default new AdminCommentController();
