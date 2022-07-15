import { Router } from "express";

import { OfficesV1Controller } from "../controllers/OfficesController.v1";
import { OfficeMostUsedV1Controller } from "../controllers/OfficeMostUsedController.v1";
import { ensureAuthenticatedV1 } from "@/modules/users/middlewares";

const officesV1Router = Router();

const officesV1Controller = new OfficesV1Controller();
const officeMostUsedController = new OfficeMostUsedV1Controller();

officesV1Router.use(ensureAuthenticatedV1);

officesV1Router.get("/", officesV1Controller.find);

officesV1Router.get("/most-used", officeMostUsedController.get);

export { officesV1Router };
