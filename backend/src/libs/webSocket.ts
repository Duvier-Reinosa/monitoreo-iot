import { Server } from 'http';
import { Server as SocketIOServer, Socket as SocketIOInstance } from 'socket.io';

class Socket {
    private io!: SocketIOServer;

    public initialize(server: Server): void {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        this.io.on('connection', (socket: SocketIOInstance) => {
            console.log('🔌 New connection:', socket.id);

            socket.on('join', (id: string) => {
                if (id) {
                    socket.join(id);
                    console.log(`✅ Joined room: ${id}`);
                }
            });

            socket.on('sendLogValue', (data: { agent_name: string; value: any }) => {
                console.log(`📢 Broadcasting log to ${data.agent_name}:`, data);
                socket.broadcast.to(data.agent_name).emit('logValue', data);
            });

            socket.on('disconnect', () => {
                console.log(`❌ Disconnected: ${socket.id}`);
            });
        });
    }

    // 🔥 Este método permite acceder a `io` desde cualquier parte del backend
    public getIO(): SocketIOServer {
        if (!this.io) {
            throw new Error('Socket.io has not been initialized! Call initialize(server) first.');
        }
        return this.io;
    }
}

export default new Socket();
