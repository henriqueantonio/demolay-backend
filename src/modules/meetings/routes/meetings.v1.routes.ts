import { ensureAuthenticatedV1 } from "@/modules/users/middlewares/ensureAuthenticated.v1";
import { Router } from "express";

import { MeetingsV1Controller } from "../controllers/MeetingsController.v1";

const meetingsV1Controller = new MeetingsV1Controller();

const meetingsV1Router = Router();

meetingsV1Router.use(ensureAuthenticatedV1);

meetingsV1Router.post("/", meetingsV1Controller.create);

meetingsV1Router.put("/:id", meetingsV1Controller.update);

meetingsV1Router.delete("/:id", meetingsV1Controller.delete);

export { meetingsV1Router };
