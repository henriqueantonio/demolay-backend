import { prisma } from "@/shared/infra/prisma/connection";

type DeleteMeetingV1Request = {
  id: string;
};

class DeleteMeetingV1Service {
  public async execute({ id }: DeleteMeetingV1Request): Promise<void> {
    await prisma.meeting.delete({ where: { id } });
  }
}

export { DeleteMeetingV1Service };
