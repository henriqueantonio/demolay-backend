import { Request, Response } from "express";

import { AuthenticateUserV1Service } from "../services/AuthenticateUserService.v1";
import { authenticateUserValidatorV1 } from "../validators/authenticateUserValidator.v1";

const authenticateUserV1Service = new AuthenticateUserV1Service();

class UsersAuthV1Controller {
  public async create(req: Request, res: Response) {
    const data = await authenticateUserValidatorV1(req.body);

    const userAuth = await authenticateUserV1Service.execute(data);

    return res.json(userAuth);
  }
}

export { UsersAuthV1Controller };
