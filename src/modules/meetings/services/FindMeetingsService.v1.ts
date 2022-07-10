import { prisma } from "@/shared/infra/prisma/connection";

class FindMeetingsV1Service {
  public async execute() {
    const meetings = await prisma.meeting.findMany({
      orderBy: { startAt: "asc" },
    });

    return meetings;
  }
}

export { FindMeetingsV1Service };
