import { z } from "zod";

async function getMeeetingValidatorV1(data: Record<string, any>) {
  return z
    .object({
      meetingId: z.string().uuid(),
    })
    .parseAsync(data);
}

export { getMeeetingValidatorV1 };
