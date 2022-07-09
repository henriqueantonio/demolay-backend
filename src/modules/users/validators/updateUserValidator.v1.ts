import { z } from "zod";

async function updateUsersValidatorV1(data: Record<string, any>) {
  return z
    .object({
      name: z.string().min(1).optional(),
      phoneNumber: z
        .string()
        .regex(/^[0-9]+$/)
        .min(13)
        .optional(),
      type: z.enum(["BROTHER", "UNCLE"]).default("BROTHER").optional(),
      birthDate: z
        .string()
        .transform((value) => new Date(value))
        .optional(),
      password: z.string().min(6).optional(),
    })
    .parseAsync(data);
}

export { updateUsersValidatorV1 };
