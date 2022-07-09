import { z } from "zod";

async function createUsersValidatorV1(data: Record<string, any>) {
  return z
    .object({
      name: z.string().min(1),
      phoneNumber: z
        .string()
        .regex(/^[0-9]+$/)
        .min(13),
      type: z.enum(["BROTHER", "UNCLE"]).default("BROTHER"),
      birthDate: z.string().transform((value) => new Date(value)),
      password: z.string().min(6),
    })
    .parseAsync(data);
}

export { createUsersValidatorV1 };
