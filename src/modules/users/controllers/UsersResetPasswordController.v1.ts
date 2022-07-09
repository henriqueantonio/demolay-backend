import { Request, Response } from "express";

import { ResetUserPasswordV1Service } from "../services/ResetUserPasswordService.v1";
import { resetPasswordValidatorV1 } from "../validators/resetPasswordValidator.v1";

const resetUserPasswordV1Service = new ResetUserPasswordV1Service();

class UsersResetPasswordV1Controller {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = await resetPasswordValidatorV1(req.body);

    await resetUserPasswordV1Service.execute(data);

    return res.status(201).json();
  }
}

export { UsersResetPasswordV1Controller };
