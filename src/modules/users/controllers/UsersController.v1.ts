import { Request, Response } from "express";

import { CreateUserV1Service } from "../services/CreateUserService.v1";
import { createUsersValidatorV1 } from "../validators/createUserValidator.v1";

import { UpdateUserV1Service } from "../services/UpdateUserService.v1";
import { updateUsersValidatorV1 } from "../validators/updateUserValidator.v1";

const createUserV1Service = new CreateUserV1Service();
const updateUserV1Service = new UpdateUserV1Service();
class UsersV1Controller {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = await createUsersValidatorV1(req.body);

    const user = await createUserV1Service.execute(data);

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = await updateUsersValidatorV1(req.body);
    const id = req.user.id;

    const { password, ...user } = await updateUserV1Service.execute({
      id,
      ...data,
    });

    return res.json(user);
  }
}

export { UsersV1Controller };
