import { Router } from "express";

import { usersFactoryV1 } from "../factories/usersFactory.v1";

const usersV1Router = Router();

const usersController = usersFactoryV1();

usersV1Router.post("/", usersController.create.bind(usersController));

export { usersV1Router };
