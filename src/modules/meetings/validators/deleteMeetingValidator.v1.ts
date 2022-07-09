import { z } from "zod";

async function deleteMeetingValidatorV1(data: Record<string, any>) {
  return z
    .object({
      id: z.string().uuid(),
    })
    .parseAsync(data);
}

export { deleteMeetingValidatorV1 };
