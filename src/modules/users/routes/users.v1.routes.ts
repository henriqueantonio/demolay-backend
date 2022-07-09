import { Router } from "express";
import { UsersV1Controller } from "../controllers/UsersController.v1";

import { ensureAuthenticatedV1 } from "../middlewares/ensureAuthenticated.v1";
import { authV1Router } from "./auth.v1.routes";

const usersV1Router = Router();

const usersV1Controller = new UsersV1Controller();

usersV1Router.use("/auth", authV1Router);

usersV1Router.post("/", usersV1Controller.create);

usersV1Router.put("/", ensureAuthenticatedV1, usersV1Controller.update);

export { usersV1Router };
