import { Request, Response } from "express";

import { CreateMeetingMemberV1Service } from "../services/CreateMeetingMemberService.v1";
import { DeleteMeetingMemberV1Service } from "../services/DeleteMeetingMemberService.v1";
import { createMeetingMemberValidatorV1 } from "../validators/createMeetingMemberValidator.v1";
import { deleteMeetingMemberValidatorV1 } from "../validators/deleteMeetingMemberValidator.v1";

const createMeetingMemberV1Service = new CreateMeetingMemberV1Service();
const deleteMeetingMemberV1Service = new DeleteMeetingMemberV1Service();

class MeetingMembersV1Controller {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = await createMeetingMemberValidatorV1({
      ...req.body,
      ...req.params,
    });

    await createMeetingMemberV1Service.execute(data);

    return res.status(201).json();
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const data = await deleteMeetingMemberValidatorV1(req.params);

    await deleteMeetingMemberV1Service.execute(data);

    return res.status(201).json();
  }
}

export { MeetingMembersV1Controller };
