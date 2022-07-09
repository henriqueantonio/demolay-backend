import { Request, Response } from "express";
import { addHours } from "date-fns";

import { CreateMeetingV1Service } from "../services/CreateMeetingService.v1";
import { DeleteMeetingV1Service } from "../services/DeleteMeetingService.v1";
import { UpdateMeetingV1Service } from "../services/UpdateMeetingService.v1";
import { createMeetingValidatorV1 } from "../validators/createMeetingValidator.v1";
import { deleteMeetingValidatorV1 } from "../validators/deleteMeetingValidator.v1";
import { updateMeetingValidatorV1 } from "../validators/updateMeetingValidator.v1";

const createMeetingV1Service = new CreateMeetingV1Service();
const updateMeetingV1Service = new UpdateMeetingV1Service();
const deleteMeetingV1Service = new DeleteMeetingV1Service();

class MeetingsV1Controller {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = await createMeetingValidatorV1(req.body);

    Object.assign(data, { endAt: data.endAt || addHours(data.startAt, 3) });

    const meeting = await createMeetingV1Service.execute(data);

    return res.json(meeting);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = await updateMeetingValidatorV1({
      ...req.body,
      ...req.params,
    });

    const meeting = await updateMeetingV1Service.execute(data);

    return res.json(meeting);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const data = await deleteMeetingValidatorV1(req.params);

    await deleteMeetingV1Service.execute(data);

    return res.status(201).json();
  }
}

export { MeetingsV1Controller };
