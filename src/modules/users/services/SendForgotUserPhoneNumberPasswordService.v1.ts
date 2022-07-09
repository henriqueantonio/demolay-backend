import { addHours } from "date-fns";

import { AppError } from "@/shared/errors/AppError";
import { prisma } from "@/shared/infra/prisma/connection";
import { phoneNumberProvider } from "@/shared/providers";

type SendForgotUserPhoneNumberPasswordV1 = {
  phoneNumber: string;
};

class SendForgotUserPhoneNumberPasswordV1Service {
  public async execute({
    phoneNumber,
  }: SendForgotUserPhoneNumberPasswordV1): Promise<void> {
    const user = await prisma.user.findFirst({ where: { phoneNumber } });

    if (!user) {
      throw new AppError({
        message: "User not found",
        statusCode: 404,
        code: "demolay.user-not-found",
      });
    }

    const { token } = await prisma.userToken.create({
      data: {
        userId: user.id,
        expiresAt: addHours(new Date(), 2),
      },
    });

    const message = `Your password reset token is: ${token}`;

    await phoneNumberProvider.sendSms(phoneNumber, message);
  }
}

export { SendForgotUserPhoneNumberPasswordV1Service };
