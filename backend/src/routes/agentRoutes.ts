import { Router } from 'express';
import { agentController } from '../controllers/agentController';

class AgentRoutes {
    public router: Router;
    public agentController = agentController;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/lastLogs', this.agentController.lastLogs);
        // this.router.get('/:id', this.agentController.getAgent);
        this.router.post('/', this.agentController.createLogAgent);
        // this.router.put('/:id', this.agentController.updateAgent);
        // this.router.delete('/:id', this.agentController.deleteAgent);
    }
}

const agentRoutes = new AgentRoutes();
export default agentRoutes.router;