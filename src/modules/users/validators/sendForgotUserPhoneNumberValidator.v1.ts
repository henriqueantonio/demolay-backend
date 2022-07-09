import { z } from "zod";

async function sendForgotUserPhoneNumberValidatorV1(data: Record<string, any>) {
  return z
    .object({
      phoneNumber: z
        .string()
        .regex(/^[0-9]+$/)
        .min(13),
    })
    .parseAsync(data);
}

export { sendForgotUserPhoneNumberValidatorV1 };
