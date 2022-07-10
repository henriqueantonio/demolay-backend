import { sign } from "jsonwebtoken";
import { User } from "@prisma/client";

import { authConfig } from "@/config/auth";
import { AppError } from "@/shared/errors/AppError";
import { prisma } from "@/shared/infra/prisma/connection";
import { hashProvider } from "@/shared/providers";

type AuthenticateUserRequest = {
  phoneNumber: string;
  password: string;
};

type AuthenticateUserResponse = {
  user: Partial<User>;
  accessToken: string;
};

const { secret, expiresIn } = authConfig.jwt;

class AuthenticateUserV1Service {
  public async execute({
    phoneNumber,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
      include: { roles: { select: { roleSlug: true } } },
    });

    if (!user) {
      throw new AppError({
        message: "Incorrect phone numbere/password combination",
        statusCode: 401,
        code: "demolay.incorrect-credentials",
      });
    }

    const passwordMatched = await hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError({
        message: "Incorrect phone numbere/password combination",
        statusCode: 401,
        code: "demolay.incorrect-credentials",
      });
    }

    const userRoles = user.roles.map((role) => role.roleSlug);

    const token = sign({ type: user.type, roles: userRoles }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        type: user.type,
        phoneNumber: user.phoneNumber,
      },
      accessToken: token,
    };
  }
}

export { AuthenticateUserV1Service };
