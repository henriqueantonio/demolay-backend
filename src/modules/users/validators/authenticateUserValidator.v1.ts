import { z } from "zod";

async function authenticateUserValidatorV1(data: Record<string, any>) {
  return z
    .object({
      phoneNumber: z
        .string()
        .regex(/^[0-9]+$/)
        .min(13),
      password: z.string().min(6),
    })
    .parseAsync(data);
}

export { authenticateUserValidatorV1 };
