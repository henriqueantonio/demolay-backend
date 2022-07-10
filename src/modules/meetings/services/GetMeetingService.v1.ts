import { AppError } from "@/shared/errors/AppError";
import { prisma } from "@/shared/infra/prisma/connection";

class GetMeetingV1Service {
  public async execute(id: string) {
    const meeting = await prisma.meeting.findFirst({
      where: { id },
      include: {
        members: {
          select: {
            member: { select: { id: true, name: true, type: true } },
            role: { select: { id: true, name: true, description: true } },
          },
        },
      },
    });

    if (!meeting) {
      throw new AppError({
        message: "Meeting not found",
        code: "demolay.meeting-not-found",
        statusCode: 404,
      });
    }

    return meeting;
  }
}

export { GetMeetingV1Service };
