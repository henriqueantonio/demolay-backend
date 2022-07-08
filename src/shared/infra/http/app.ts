import express, { Express } from "express";
import cors from "cors";

class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public listen(port = 3333): void {
    this.app.listen(port, () =>
      console.log(`Server started on port ${port} 🚀`)
    );
  }
}

export { App };
