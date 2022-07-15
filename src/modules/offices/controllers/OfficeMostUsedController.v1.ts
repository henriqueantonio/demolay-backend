import { Request, Response } from "express";

import { MostUsedOfficeV1Service } from "../services/MostUsedOfficeService.v1";

const mostUsedOfficeV1Service = new MostUsedOfficeV1Service();

class OfficeMostUsedV1Controller {
  public async get(req: Request, res: Response): Promise<Response> {
    const memberId = req.user.id;

    const mostUsedOffice = await mostUsedOfficeV1Service.execute({ memberId });

    return res.json(mostUsedOffice);
  }
}

export { OfficeMostUsedV1Controller };
