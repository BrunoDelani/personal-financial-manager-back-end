import express from 'express';
import routes from './api/routes/index.js'
import './database/connection-mongoDB.js'
import 'dotenv/config';
import { errorHandler } from './api/middlewares/error-handler.js';


class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json())
    }

    private routes(): void {
        this.express.use(...routes);
        this.express.use(errorHandler)
    }
}

export default new App().express;