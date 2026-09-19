import express from 'express';
import './database/connection-mongoDB.js'
import 'dotenv/config';


class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {

    }

    private routes(): void {

    }
}

export default new App().express;