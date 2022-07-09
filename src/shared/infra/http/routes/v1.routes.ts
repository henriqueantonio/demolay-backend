import { Router } from "express";

import { usersV1Router } from "@/modules/users/routes/users.v1.routes";
import { meetingsV1Router } from "@/modules/meetings/routes/meetings.v1.routes";

const v1Router = Router();

v1Router.use("/users", usersV1Router);
v1Router.use("/meetings", meetingsV1Router);

export { v1Router };
