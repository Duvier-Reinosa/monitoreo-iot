"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require('socket.io');
class Socket {
    webSocket(server) {
        const io = socketIO(server, {
            cors: {
                origin: '*',
                methods: ["GET", "POST"]
            }
        });
        io.on('connection', (socket) => {
            console.log('new connection', socket.id);
            socket.on('join', (id) => {
                if (id) {
                    socket.join(id);
                    console.log('joined', id);
                }
            });
            socket.on('sendLogValue', (data) => {
                console.log('sending', data);
                socket.broadcast.to(data.agent_name).emit("logValue", data);
            });
        });
    }
}
const socket = new Socket();
exports.default = socket.webSocket;
