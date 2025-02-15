import { Request, Response } from 'express';
import { db } from '../database';
import websocket from '../libs/webSocket';

class AgentController {
    public async createLogAgent(req: Request, res: Response): Promise<Response> {
        const { agent_name, log_value } = req.body;

        if (!agent_name || !log_value) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        try {
            // Guardamos el log en la base de datos
            const newAgent = await db.query(
                'INSERT INTO agent_logs (agent_name, log_value) VALUES ($1, $2) RETURNING *',
                [agent_name, log_value]
            );

            // Obtenemos la instancia de `io` y emitimos el evento
            const io = websocket.getIO();
            io.emit('logValue', { agent_name, log_value });

            return res.status(201).json(newAgent.rows[0]);
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const agentController = new AgentController();