"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const bodyParser = require('body-parser');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
const dotenv_1 = __importDefault(require("dotenv"));
const agentRoutes_1 = __importDefault(require("./routes/agentRoutes"));
const webSocket_1 = __importDefault(require("./libs/webSocket"));
dotenv_1.default.config({ path: '.env' });
const corsOptions = {
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
};
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 3033);
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: "5000mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50000mb", extended: true, parameterLimit: 50000 }));
    }
    routes() {
        // this.app.use('/', (req, res) => {
        //     res.send('Hello World');
        // });
        this.app.use('/api/agent', agentRoutes_1.default);
    }
    start() {
        try {
            const server = this.app.listen(this.app.get('port'), () => {
                console.log(chalk_1.default.blue(`\nServer corriendo en: ${this.app.get('port')}`));
                (0, webSocket_1.default)(server);
            });
        }
        catch (error) {
            console.error('Error al iniciar el servidor:', error);
        }
        //web socket para el real time
    }
}
exports.Server = Server;
const server = new Server();
server.start();
