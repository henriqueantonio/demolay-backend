import { AppError } from "@/shared/errors/AppError";
import { prisma } from "@/shared/infra/prisma/connection";

type CreateMeetingMemberV1 = {
  meetingId: string;
  memberId: string;
  roleId: string;
};

class CreateMeetingMemberV1Service {
  public async execute(data: CreateMeetingMemberV1): Promise<void> {
    const roleExists = await prisma.meetingMember.findFirst({
      where: { meetingId: data.meetingId, roleId: data.roleId },
      include: { role: { select: { isIndividual: true } } },
    });

    if (roleExists && roleExists.role.isIndividual) {
      throw new AppError({
        message: "Role is already assigned to a member",
        code: "demolay.role-already-assigned",
        statusCode: 401,
      });
    }

    const memberAlreadyExists = await prisma.meetingMember.findFirst({
      where: { meetingId: data.meetingId, memberId: data.memberId },
    });

    if (memberAlreadyExists) {
      throw new AppError({
        message: "Member is already assigned to this meeting",
        code: "demolay.member-already-assigned",
        statusCode: 401,
      });
    }

    await prisma.meetingMember.create({ data });
  }
}

export { CreateMeetingMemberV1Service };
