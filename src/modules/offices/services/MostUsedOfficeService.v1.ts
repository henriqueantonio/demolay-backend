import { prisma } from "@/shared/infra/prisma/connection";
import { Office } from "@prisma/client";

type MostUsedOfficeV1 = {
  memberId: string;
};

class MostUsedOfficeV1Service {
  public async execute({ memberId }: MostUsedOfficeV1): Promise<Office | null> {
    const mostUsedOffice = await prisma.meetingMember.aggregate({
      _max: { officeSlug: true },
      where: { memberId },
    });

    if (!mostUsedOffice._max.officeSlug) return null;

    const office = await prisma.office.findFirst({
      where: { slug: mostUsedOffice._max.officeSlug },
    });

    return office;
  }
}

export { MostUsedOfficeV1Service };
