import { z } from "zod";

async function createMeetingMemberValidatorV1(data: Record<string, any>) {
  return z
    .object({
      meetingId: z.string().uuid(),
      memberId: z.string().uuid(),
      roleId: z.string().uuid(),
    })
    .parseAsync(data);
}

export { createMeetingMemberValidatorV1 };
