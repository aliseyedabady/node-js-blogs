import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";
import DBService from "../../lib/DBService";
import { Blog, Image } from "../../models";
import { deleteFile, getFileName } from "../../lib/utils";

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
  async find(req: Request, res: Response) {
    try {
      const blog = await DBService.getById({
        model: Blog,
        id: req.params.id,
        withRelation: ["category", "image", "comments.[replies]"],
      });
      if (blog) {
        ResponseHandler.success(res, blog);
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
      const blog = await DBService.update({
        model: Blog,
        id: req.params.id,
        data: req.body,
      });
      if (blog) {
        if (req.file) {
          const image = await Image.query()
            .where("type", "blog")
            .andWhere("type_id", blog.$id())
            .first();
          if (image) {
            deleteFile(getFileName(image.url));
            await Image.query().updateAndFetchById(image.id, {
              url: req.file.path,
            });
          }
          await DBService.insert({
            model: Image,
            data: {
              data: {
                url: req.file.path,
                type: "blog",
                type_id: req.params.id,
              },
            },
          });
        }
        ResponseHandler.success(
          res,
          req.file ? { ...blog, image: req.file.path } : blog
        );
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
      const blog = await DBService.delete({
        id: req.params.id,
        model: Blog,
      });
      if (blog) {
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

export default new BlogController();
