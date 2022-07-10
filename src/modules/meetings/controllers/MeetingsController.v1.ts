import { Request, Response } from "express";
import { addHours } from "date-fns";

import { CreateMeetingV1Service } from "../services/CreateMeetingService.v1";
import { DeleteMeetingV1Service } from "../services/DeleteMeetingService.v1";
import { UpdateMeetingV1Service } from "../services/UpdateMeetingService.v1";
import { createMeetingValidatorV1 } from "../validators/createMeetingValidator.v1";
import { deleteMeetingValidatorV1 } from "../validators/deleteMeetingValidator.v1";
import { updateMeetingValidatorV1 } from "../validators/updateMeetingValidator.v1";
import { getMeeetingValidatorV1 } from "../validators/getMeeetingValidator.v1";
import { GetMeetingV1Service } from "../services/GetMeetingService.v1";
import { FindMeetingsV1Service } from "../services/FindMeetingsService.v1";

const getMeetingV1Service = new GetMeetingV1Service();
const findMeetingsV1Service = new FindMeetingsV1Service();
const createMeetingV1Service = new CreateMeetingV1Service();
const updateMeetingV1Service = new UpdateMeetingV1Service();
const deleteMeetingV1Service = new DeleteMeetingV1Service();

class MeetingsV1Controller {
  public async get(req: Request, res: Response): Promise<Response> {
    const data = await getMeeetingValidatorV1(req.params);

    const meeting = await getMeetingV1Service.execute(data.meetingId);

    return res.json(meeting);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const meetings = await findMeetingsV1Service.execute();

    return res.json(meetings);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = await createMeetingValidatorV1(req.body);

    const newData = {
      ...data,
      endAt: data.endAt || addHours(data.startAt, 3),
    };

    const meeting = await createMeetingV1Service.execute(newData);

    return res.json(meeting);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { meetingId, ...data } = await updateMeetingValidatorV1({
      ...req.body,
      ...req.params,
    });

    const meeting = await updateMeetingV1Service.execute({
      id: meetingId,
      ...data,
    });

    return res.json(meeting);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { meetingId, ...data } = await deleteMeetingValidatorV1(req.params);

    await deleteMeetingV1Service.execute({ id: meetingId, ...data });

    return res.status(201).json();
  }
}

export { MeetingsV1Controller };
