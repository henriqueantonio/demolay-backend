import { Router } from "express";

import { MeetingMembersV1Controller } from "../controllers/MeetingMembersController.v1";

const membersV1Router = Router({ mergeParams: true });

const meetingMembersV1Controlleer = new MeetingMembersV1Controller();

membersV1Router.post("/", meetingMembersV1Controlleer.create);

membersV1Router.delete("/:memberId", meetingMembersV1Controlleer.delete);

export { membersV1Router };
