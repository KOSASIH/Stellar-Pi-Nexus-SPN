import { Server } from 'socket.io';

export class WebSocketServer {
    private io: Server;

    constructor(server: any) {
        this.io = new Server(server);
        this.setupListeners();
    }

    private setupListeners() {
        this.io.on('connection', (socket) => {
            console.log('A user connected');
            socket.on('transaction', (data) => {
                this.io.emit('transaction', data);
            });
        });
    }
}
