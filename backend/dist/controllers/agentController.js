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
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentController = void 0;
const database_1 = require("../database");
class AgentController {
    createLogAgent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { agent_name, log_value } = req.body;
            if (!agent_name || !log_value) {
                return res.status(400).json({ message: 'Invalid request' });
            }
            try {
                const newAgent = yield database_1.db.query('INSERT INTO agent_logs (agent_name, log_value) VALUES ($1, $2) RETURNING *', [agent_name, log_value]);
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
