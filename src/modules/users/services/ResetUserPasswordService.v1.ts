import { isAfter } from "date-fns";

import { AppError } from "@/shared/errors/AppError";
import { prisma } from "@/shared/infra/prisma/connection";
import { hashProvider } from "@/shared/providers";

type ResetUserPasswordV1 = {
  token: string;
  password: string;
};

class ResetUserPasswordV1Service {
  public async execute({
    token,
    password,
  }: ResetUserPasswordV1): Promise<void> {
    const userToken = await prisma.userToken.findFirst({ where: { token } });

    if (!userToken) {
      throw new AppError({
        message: "User token does not exists",
        code: "demolay.user-token-not-exists",
      });
    }

    if (isAfter(new Date(), userToken.expiresAt)) {
      throw new AppError({
        message: "Token expired",
        code: "demolay.token-expired",
      });
    }

    const hashPassword = await hashProvider.generateHash(password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userToken.userId },
        data: { password: hashPassword },
      }),
      prisma.userToken.update({
        where: {
          token_userId: { userId: userToken.userId, token: userToken.token },
        },
        data: { expiresAt: new Date() },
      }),
    ]);
  }
}

export { ResetUserPasswordV1Service };
