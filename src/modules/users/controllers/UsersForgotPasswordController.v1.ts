import { Request, Response } from "express";

import { SendForgotUserPhoneNumberPasswordV1Service } from "../services/SendForgotUserPhoneNumberPasswordService.v1";
import { sendForgotUserPhoneNumberValidatorV1 } from "../validators/sendForgotUserPhoneNumberValidator.v1";

const sendForgotUserPhoneNumberPasswordV1Service =
  new SendForgotUserPhoneNumberPasswordV1Service();

class UsersForgotPasswordV1Controller {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = await sendForgotUserPhoneNumberValidatorV1(req.body);

    await sendForgotUserPhoneNumberPasswordV1Service.execute(data);

    return res.status(201).json();
  }
}

export { UsersForgotPasswordV1Controller };
