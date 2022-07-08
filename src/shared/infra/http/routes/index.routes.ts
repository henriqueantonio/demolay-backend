import { Router } from "express";

import { v1Router } from "./v1.routes";

const baseRouter = Router();

baseRouter.use("/v1", v1Router);

baseRouter.get("/health-check", (_, res) => res.json({ status: "ok" }));

export { baseRouter };
