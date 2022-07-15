import { z } from "zod";

async function createMeetingMemberValidatorV1(data: Record<string, any>) {
  return z
    .object({
      meetingId: z.string().uuid(),
      officeSlug: z.string(),
    })
    .parseAsync(data);
}

export { createMeetingMemberValidatorV1 };
