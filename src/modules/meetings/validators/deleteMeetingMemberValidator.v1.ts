import { z } from "zod";

async function deleteMeetingMemberValidatorV1(data: Record<string, any>) {
  return z
    .object({
      meetingId: z.string().uuid(),
      memberId: z.string().uuid(),
    })
    .parseAsync(data);
}

export { deleteMeetingMemberValidatorV1 };
