import { AppError } from "@/shared/errors/AppError";
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
    const memberAlreadyExists = await prisma.meetingMember.findFirst({
      where: { meetingId, memberId },
    });

    if (!memberAlreadyExists) {
      throw new AppError({
        message: "Member is not assigned to this meeting",
        code: "demolay.member-not-assigned",
        statusCode: 404,
      });
    }

    await prisma.meetingMember.delete({
      where: { memberId_meetingId: { meetingId, memberId } },
    });
  }
}

export { DeleteMeetingMemberV1Service };
