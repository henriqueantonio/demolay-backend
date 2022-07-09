import { Prisma, User } from "@prisma/client";

import { prisma } from "@/shared/infra/prisma/connection";
import { hashProvider } from "@/shared/providers";

class CreateUserV1Service {
  public async execute(data: Prisma.UserCreateInput): Promise<User> {
    const hashPassword = await hashProvider.generateHash(data.password);

    data.password = hashPassword;

    const user = await prisma.user.create({ data });

    return user;
  }
}

export { CreateUserV1Service };
