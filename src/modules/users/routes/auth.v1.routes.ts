import { Router } from "express";

import { UsersAuthV1Controller } from "../controllers/UsersAuthController.v1";
import { UsersResetPasswordV1Controller } from "../controllers/UsersResetPasswordController.v1";
import { UsersForgotPasswordV1Controller } from "../controllers/UsersForgotPasswordController.v1";

const authV1Router = Router();

const usersAuthV1Controller = new UsersAuthV1Controller();
const usersResetPasswordV1Controller = new UsersResetPasswordV1Controller();
const usersForgotPasswordV1Controller = new UsersForgotPasswordV1Controller();

authV1Router.post("/", usersAuthV1Controller.create);

authV1Router.post("/reset-password", usersResetPasswordV1Controller.create);

authV1Router.post("/forgot-password", usersForgotPasswordV1Controller.create);

export { authV1Router };
