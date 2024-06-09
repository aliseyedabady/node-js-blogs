import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseHandler from "../../lib/ResponseHandler";
import { hashPassword } from "../../lib/utils";
import { User } from "../../models";
import DBService from "../../lib/DBService";

class BlogController {
  async store(req: Request, res: Response) {}
  async get(req: Request, res: Response) {}
  async find(req: Request, res: Response) {}
  async update(req: Request, res: Response) {}
  async remove(req: Request, res: Response) {}
}

export default new BlogController();
