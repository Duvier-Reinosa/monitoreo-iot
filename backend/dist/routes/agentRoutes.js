"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agentController_1 = require("../controllers/agentController");
class AgentRoutes {
    constructor() {
        this.agentController = agentController_1.agentController;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // this.router.get('/', this.agentController.getAgents);
        // this.router.get('/:id', this.agentController.getAgent);
        this.router.post('/', this.agentController.createLogAgent);
        // this.router.put('/:id', this.agentController.updateAgent);
        // this.router.delete('/:id', this.agentController.deleteAgent);
    }
}
const agentRoutes = new AgentRoutes();
exports.default = agentRoutes.router;
