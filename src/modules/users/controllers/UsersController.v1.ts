import { Request, Response } from "express";

import { CreateUserV1Service } from "../services/CreateUserService.v1";
import { createUsersValidatorV1 } from "../validators/createUserValidator.v1";

class UsersV1Controller {
  constructor(private createUserV1Service: CreateUserV1Service) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const data = await createUsersValidatorV1(req.body);

    const user = await this.createUserV1Service.execute(data);

    return res.json(user);
  }
}

export { UsersV1Controller };
