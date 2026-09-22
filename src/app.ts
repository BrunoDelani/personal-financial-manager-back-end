import express from "express";
import routes from "./routes/index.js";
import "./database/connection-mongoDB.js";
import "dotenv/config";
import { errorHandler } from "./middlewares/error-handler.js";
import cookieParser from "cookie-parser";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cookieParser());
  }

  private routes(): void {
    this.express.use(...routes);
    this.express.use(errorHandler);
  }
}

export default new App().express;
