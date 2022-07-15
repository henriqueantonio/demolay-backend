import { Router } from "express";

import { OfficesV1Controller } from "../controllers/OfficesController.v1";
import { ensureAuthenticatedV1 } from "@/modules/users/middlewares";

const officesV1Router = Router();

const officesV1Controller = new OfficesV1Controller();

officesV1Router.use(ensureAuthenticatedV1);

officesV1Router.get("/", officesV1Controller.find);

export { officesV1Router };
