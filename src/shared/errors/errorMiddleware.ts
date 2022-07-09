import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ZodError } from "zod";

import { AppError } from "./AppError";

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "validation-error",
      message: err.errors,
      code: 400,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      code: err.code,
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    return res.status(400).json({
      status: "error",
      message: err.meta,
      code: 400,
    });
  }

  if (err.name === "SyntaxError") {
    return res.status(400).json({
      status: "error",
      message: "Invalid Syntax",
      code: "demolay.invalid-syntax",
    });
  }

  console.log(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
    code: "demolay.internal-server-error",
  });
}

export { errorMiddleware };
