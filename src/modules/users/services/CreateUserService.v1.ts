import { Prisma, User } from "@prisma/client";

import { prisma } from "@/shared/infra/prisma/connection";
import { hashProvider } from "@/shared/providers";

type CreateUserV1 = {
  role: string;
} & Prisma.UserCreateInput;
class CreateUserV1Service {
  public async execute({
    role,
    ...data
  }: CreateUserV1): Promise<Partial<User>> {
    const hashPassword = await hashProvider.generateHash(data.password);

    data.password = hashPassword;

    const user = await prisma.user.create({
      data: { ...data, roles: { create: { roleSlug: role } } },
      select: { id: true, name: true },
    });

    return user;
  }
}

export { CreateUserV1Service };
