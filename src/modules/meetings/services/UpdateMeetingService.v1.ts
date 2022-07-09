import { Meeting, Prisma } from "@prisma/client";

import { prisma } from "@/shared/infra/prisma/connection";

type UpdateMeetingRequest = Partial<
  Omit<Prisma.MeetingCreateInput, "endAt" | "startAt">
> & {
  id: string;
  endAt?: Date;
  startAt?: Date;
};

class UpdateMeetingV1Service {
  public async execute({
    id,
    ...data
  }: UpdateMeetingRequest): Promise<Meeting> {
    const meeting = await prisma.meeting.update({ where: { id }, data });

    return meeting;
  }
}

export { UpdateMeetingV1Service };
