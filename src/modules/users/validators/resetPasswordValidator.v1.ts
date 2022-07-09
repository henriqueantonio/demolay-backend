import { z } from "zod";

async function resetPasswordValidatorV1(data: Record<string, any>) {
  return z
    .object({
      token: z.string().uuid().min(1),
      password: z.string().min(6),
    })
    .parseAsync(data);
}

export { resetPasswordValidatorV1 };
