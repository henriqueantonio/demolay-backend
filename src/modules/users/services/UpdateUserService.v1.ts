import { Prisma, User } from "@prisma/client";

import { prisma } from "@/shared/infra/prisma/connection";

type UpdateUserV1 = {
  id: string;
} & Prisma.UserUpdateInput;

class UpdateUserV1Service {
  public async execute({ id, ...data }: UpdateUserV1): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data });

    return user;
  }
}

export { UpdateUserV1Service };
