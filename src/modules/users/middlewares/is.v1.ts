import { NextFunction, Request, Response } from "express";

import { AppError } from "@/shared/errors/AppError";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

function isV1(roles: string[]): Middleware {
  function roleAuthorized(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const userRoles = req.user.roles;

    if (userRoles.some((r) => roles.includes(r))) {
      throw new AppError({
        message: "Your are not allowed here",
        code: "meaple.not-allowed",
        statusCode: 401,
      });
    }

    return next();
  }

  return roleAuthorized;
}

export { isV1 };
