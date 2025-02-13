import { Request, Response } from 'express';
import { db } from '../database';
import socketIo from 'socket.io-client'

class AgentController {
    public async createLogAgent(req: Request, res: Response): Promise<Response> {
        const { agent_name, log_value } = req.body;

        console.log(agent_name, log_value);

        if (!agent_name || !log_value) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        try {
            const newAgent = await db.query('INSERT INTO agent_logs (agent_name, log_value) VALUES ($1, $2) RETURNING *', [agent_name, log_value]);
            const socket = socketIo('http://localhost:3033');

            socket.connect();

            socket.emit('sendLogValue', { agent_name, log_value });

            return res.status(201).json(newAgent.rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const agentController = new AgentController();