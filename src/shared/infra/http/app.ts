import "dotenv/config";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { baseRouter } from "./routes/index.routes";
import { errorMiddleware } from "@/shared/errors/errorMiddleware";

class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(baseRouter);
    this.app.use(errorMiddleware);
  }

  public listen(port = 3333): void {
    this.app.listen(port, () =>
      console.log(`Server started on port ${port} 🚀`)
    );
  }
}

export { App };
