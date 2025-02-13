const socketIO = require('socket.io');

class Socket {
    webSocket(server:any):any {
        const io = socketIO(server,
            {
                cors: {
                    origin: '*',
                    methods: ["GET", "POST"]
                }
            }
        )

        io.on('connection', (socket:any) => {
            console.log('new connection', socket.id);

            socket.on('join', (id:any) => {
                if (id) {
                    socket.join(id);
                    console.log('joined', id);
                }
            })

            socket.on('sendLogValue', (data:any) => {
                console.log('sending', data);
                socket.broadcast.to(data.agent_name).emit("logValue", data);
            })
        })
    }
}

const socket = new Socket();
export default socket.webSocket