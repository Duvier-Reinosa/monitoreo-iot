"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentController = void 0;
const database_1 = require("../database");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
class AgentController {
    createLogAgent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { agent_name, log_value } = req.body;
            console.log(agent_name, log_value);
            if (!agent_name || !log_value) {
                return res.status(400).json({ message: 'Invalid request' });
            }
            try {
                const newAgent = yield database_1.db.query('INSERT INTO agent_logs (agent_name, log_value) VALUES ($1, $2) RETURNING *', [agent_name, log_value]);
                const socket = (0, socket_io_client_1.default)('http://localhost:3033');
                socket.connect();
                socket.emit('sendLogValue', { agent_name, log_value });
                return res.status(201).json(newAgent.rows[0]);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.agentController = new AgentController();
