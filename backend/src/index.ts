const bodyParser = require('body-parser');

import express, { Application} from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { db } from "./database";

import agentRoutes from './routes/agentRoutes';
import webSocket from './libs/webSocket';

dotenv.config({path: '.env'});

const corsOptions = {
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
};

export class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', 3033);
        
        this.app.use(cors(corsOptions))
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: "5000mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50000mb", extended: true, parameterLimit: 50000 }));
    }

    routes() {
        // this.app.use('/', (req, res) => {
        //     res.send('Hello World');
        // });

        this.app.use('/api/agent', agentRoutes);

    }

    start():void{
        try {
            const server = this.app.listen(this.app.get('port'), () => {
                console.log(chalk.blue(`\nServer corriendo en: ${this.app.get('port')}`));
                webSocket(server);
            });
        } catch (error) {
            console.error('Error al iniciar el servidor:', error);
        }

        //web socket para el real time
    }
}

const server = new Server();
server.start();