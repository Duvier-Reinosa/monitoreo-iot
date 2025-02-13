"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// dotenv.config({path: '.env'});
dotenv_1.default.config({ path: '.env' });
const keys = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    port: process.env.PORT_DB,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.CA_CERTIFICATE
    }
};
console.log('test');
exports.db = new pg_1.Pool(keys);
exports.db.connect((err, client, release) => {
    if (err) {
        return console.error('Error en la conexión', err.stack);
    }
    else {
        return console.log('base de datos conectada');
    }
});
