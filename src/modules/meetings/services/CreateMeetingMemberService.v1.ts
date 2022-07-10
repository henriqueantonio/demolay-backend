import { AppError } from "@/shared/errors/AppError";
import { prisma } from "@/shared/infra/prisma/connection";

type CreateMeetingMemberV1 = {
  meetingId: string;
  memberId: string;
  officeSlug: string;
};

class CreateMeetingMemberV1Service {
  public async execute(data: CreateMeetingMemberV1): Promise<void> {
    const officeExists = await prisma.meetingMember.findFirst({
      where: { meetingId: data.meetingId, officeSlug: data.officeSlug },
      include: { office: { select: { isIndividual: true } } },
    });

    if (officeExists && officeExists.office.isIndividual) {
      throw new AppError({
        message: "Office is already assigned to a member",
        code: "demolay.office-already-assigned",
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

    const member = await prisma.user.findUnique({
      where: { id: data.memberId },
      include: { roles: { select: { roleSlug: true } } },
    });

    if (!member) {
      throw new AppError({
        message: "Member does not exist",
        code: "demolay.member-does-not-exist",
        statusCode: 404,
      });
    }

    const roles = member.roles.map((role) => role.roleSlug);

    if (roles.includes("uncle") && data.officeSlug !== "uncle") {
      throw new AppError({
        message:
          "Member is an uncle and can only be assigned to the uncle office",
        code: "demolay.member-is-uncle",
        statusCode: 401,
      });
    }

    await prisma.meetingMember.create({ data });
  }
}

export { CreateMeetingMemberV1Service };
