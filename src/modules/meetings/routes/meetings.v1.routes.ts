import { Router } from "express";

import { MeetingsV1Controller } from "../controllers/MeetingsController.v1";
import { membersV1Router } from "./members.v1.routes";
import { ensureAuthenticatedV1 } from "@/modules/users/middlewares/ensureAuthenticated.v1";

const meetingsV1Controller = new MeetingsV1Controller();

const meetingsV1Router = Router();

meetingsV1Router.use(ensureAuthenticatedV1);

meetingsV1Router.use("/:meetingId/members", membersV1Router);

meetingsV1Router.get("/:meetingId", meetingsV1Controller.get);

meetingsV1Router.get("/", meetingsV1Controller.find);

meetingsV1Router.post("/", meetingsV1Controller.create);

meetingsV1Router.put("/:meetingId", meetingsV1Controller.update);

meetingsV1Router.delete("/:meetingId", meetingsV1Controller.delete);

export { meetingsV1Router };
