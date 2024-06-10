import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";
import DBService from "../../lib/DBService";
import { Blog, Image } from "../../models";

class BlogController {
  async store(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
      const blog = await DBService.insert({ model: Blog, data: req.body });
      if (req.file) {
        await DBService.insert({
          model: Image,
          data: {
            url: req.file.path,
            type: "blog",
            type_id: blog.id,
          },
        });
      }
      console.log({ blog });
      ResponseHandler.success(
        res,
        req.file ? { ...blog, image: req.file.path } : blog
      );
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async get(req: Request, res: Response) {
    try {
      const blogs = await DBService.get({
        model: Blog,
        req,
        filters: ["title"],
        withRelation: ["category", "image"],
      });
      ResponseHandler.success(res, blogs);
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async find(req: Request, res: Response) {}
  async update(req: Request, res: Response) {}
  async remove(req: Request, res: Response) {}
}

export default new BlogController();
