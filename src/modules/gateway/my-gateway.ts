import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

@WebSocketGateway()
export class MyGateway {
    @WebSocketServer()
    server: Server;

    constructor() {
    }

    @SubscribeMessage('join')
    handleJoin(@MessageBody() message): void {
        this.server.emit('join', {"message": "joined"});
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() msg, client: Socket): void {
        const data = JSON.parse(msg);
        switch (data.method) {
            case 'connection':
                this.server.send(JSON.stringify({
                    ...data,
                    sessionId: client.id,
                    message: `Клиент ${data.userName} присоединился. SessionId: ${client.id}`
                }));
                break;
            case 'broadcast':
                this.server.send(JSON.stringify({
                    ...data,
                    message: `Клиент ${data.userName} присоединился.`
                }));
                break;
            case 'draw':
                this.server.send(msg);
            default:
        }
    }
}