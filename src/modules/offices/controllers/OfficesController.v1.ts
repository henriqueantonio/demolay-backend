import { Request, Response } from "express";

import { FindOfficesV1Service } from "../services/FindOfficesService.v1";

const findOfficesV1Service = new FindOfficesV1Service();

class OfficesV1Controller {
  public async find(req: Request, res: Response): Promise<Response> {
    const offices = await findOfficesV1Service.execute();

    return res.json(offices);
  }
}

export { OfficesV1Controller };
