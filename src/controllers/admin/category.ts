import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";
import DBService from "../../lib/DBService";
import { Category, Image } from "../../models";

class CategoryController {
  async store(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
      const { title } = req.body;
      const category = await DBService.insert({
        model: Category,
        data: {
          title,
        },
      });
      if (req.file) {
        await DBService.insert({
          model: Image,
          data: {
            url: req.file.path,
            type: "category",
            type_id: category.id,
          },
        });
      }
      ResponseHandler.success(
        res,
        req.file ? { ...category, image: req.file.path } : category
      );
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async get(req: Request, res: Response) {
    try {
      const categories = await DBService.get({
        model: Category,
        req,
        filters: ["title"],
        withRelation: ["image"],
      });
      ResponseHandler.success(res, categories);
    } catch (error) {
      console.log(error);
      ResponseHandler.error(res, error);
    }
  }
  async find(req: Request, res: Response) {
    try {
      const category = await DBService.getById({
        model: Category,
        id: req.params.id,
      });
      if (category) {
        ResponseHandler.success(res, category);
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
      const category = await DBService.update({
        model: Category,
        id: req.params.id,
        data: req.body,
      });
      if (category) {
        ResponseHandler.success(res, category);
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
      const category = await DBService.delete({
        id: req.params.id,
        model: Category,
      });
      if (category) {
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

export default new CategoryController();
