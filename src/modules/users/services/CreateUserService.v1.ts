import { Prisma, User } from "@prisma/client";

import { prisma } from "@/shared/infra/prisma/connection";

class CreateUserV1Service {
  public async execute(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}

export { CreateUserV1Service };
