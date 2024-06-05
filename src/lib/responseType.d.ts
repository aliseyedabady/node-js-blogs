// src/utils/IResponseHandler.ts

import { Response } from "express";

interface IResponseHandler {
  success(
    res: Response,
    data: any,
    message?: string,
    statusCode?: number
  ): Response;
  error(
    res: Response,
    error: any,
    message?: string,
    statusCode?: number
  ): Response;
  notFound(res: Response, message?: string, statusCode?: number): Response;
  badRequest(res: Response, message?: string, statusCode?: number): Response;
}

export default IResponseHandler;
