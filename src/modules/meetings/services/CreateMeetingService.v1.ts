import { addHours } from "date-fns";

import { prisma } from "@/shared/infra/prisma/connection";
import { Meeting, Prisma } from "@prisma/client";
import { AppError } from "@/shared/errors/AppError";

class CreateMeetingV1Service {
  public async execute(data: Prisma.MeetingCreateInput): Promise<Meeting> {
    const meetingAlreadyRunning = await prisma.meeting.findFirst({
      where: {
        startAt: { lte: data.startAt },
        endAt: { gte: data.startAt },
      },
    });

    if (meetingAlreadyRunning) {
      throw new AppError({
        message: "Meeting already running",
        statusCode: 401,
        code: "demolay.meeting-already-running",
      });
    }

    const meeting = await prisma.meeting.create({ data });

    return meeting;
  }
}

export { CreateMeetingV1Service };
