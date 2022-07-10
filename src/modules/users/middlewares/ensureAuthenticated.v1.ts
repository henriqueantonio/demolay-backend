import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@/shared/errors/AppError";
import { authConfig } from "@/config/auth";

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
  roles: string[];
};

function ensureAuthenticatedV1(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError({
      message: "JWT token is missing",
      statusCode: 401,
      code: "demolay.jwt-missing",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, roles } = decoded as TokenPayload;

    req.user = { id: sub, roles };

    return next();
  } catch (err) {
    throw new AppError({
      message: "Invalid JWT token",
      statusCode: 401,
      code: "demolay.invalid-jwt-token",
    });
  }
}

export { ensureAuthenticatedV1 };
