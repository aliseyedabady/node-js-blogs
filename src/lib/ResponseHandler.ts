import { Response } from "express";
import { Result, ValidationError } from "express-validator";

class ResponseHandler {
  success(
    res: Response,
    data: any,
    message = "Success",
    statusCode = 200
  ): Response {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  }

  error(
    res: Response,
    error: any,
    message = "Server Error",
    statusCode = 500
  ): Response {
    return res.status(statusCode).json({
      status: "error",
      message,
      error,
    });
  }

  notFound(
    res: Response,
    message = "Resource not found",
    statusCode = 404
  ): Response {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  }

  badRequest(
    res: Response,
    message = "Bad Request",
    statusCode = 400
  ): Response {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  }

  validationError(
    res: Response,
    message: Result<ValidationError>,
    statusCode = 422
  ) {
    return res.status(statusCode).json({
      status: "error",
      message: message.array(),
    });
  }
}

export default new ResponseHandler();
