import { prisma } from "@/shared/infra/prisma/connection";

type CreateMeetingMemberV1 = {
  meetingId: string;
  memberId: string;
  roleId: string;
};

class CreateMeetingMemberV1Service {
  public async execute(data: CreateMeetingMemberV1): Promise<void> {
    await prisma.meetingMember.create({ data });
  }
}

export { CreateMeetingMemberV1Service };
