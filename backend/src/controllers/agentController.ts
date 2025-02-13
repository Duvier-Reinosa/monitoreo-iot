import { Request, Response } from 'express';
import { db } from '../database';

class AgentController {
    public async createLogAgent(req: Request, res: Response): Promise<Response> {

    }
}

export const agentController = new AgentController();