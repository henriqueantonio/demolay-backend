import { prisma } from "@/shared/infra/prisma/connection";

class FindOfficesV1Service {
  public async execute() {
    return prisma.office.findMany();
  }
}

export { FindOfficesV1Service };
