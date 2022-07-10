import { prisma } from "@/shared/infra/prisma/connection";

type DeleteMeetingMemberV1 = {
  meetingId: string;
  memberId: string;
};

class DeleteMeetingMemberV1Service {
  public async execute({
    meetingId,
    memberId,
  }: DeleteMeetingMemberV1): Promise<void> {
    await prisma.meetingMember.delete({
      where: { memberId_meetingId: { meetingId, memberId } },
    });
  }
}

export { DeleteMeetingMemberV1Service };
