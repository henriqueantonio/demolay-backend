import { NextFunction, Request, Response } from "express";

function ensureAuthenticatedV1(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  return next();
}

export { ensureAuthenticatedV1 };
