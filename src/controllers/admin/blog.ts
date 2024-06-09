import { Request, Response } from "express";

class BlogController {
  async store(req: Request, res: Response) {}
  async get(req: Request, res: Response) {}
  async find(req: Request, res: Response) {}
  async update(req: Request, res: Response) {}
  async remove(req: Request, res: Response) {}
}

export default new BlogController();
