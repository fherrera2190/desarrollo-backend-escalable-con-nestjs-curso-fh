import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true, namespace: '/' })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}
  async handleConnection(client: Socket) {
    //console.log('Client connected ', client.id);
    //const token = client.handshake.headers.authorization as string;
    const token = client.handshake.headers.authorization as string;

    //console.log(client.handshake.headers.authorization);
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      client.disconnect();
      return;
    }
    //console.log({ payload });
    //console.log({ conectados: this.messagesWsService.getConnectedClients() });
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    //console.log({ conectados: this.messagesWsService.getConnectedClients() });
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // console.log(client.id, payload);

    //Emitir evento solo al cliente
    // client.emit('message-from-server', {
    //   fullName: 'Soy yo', //payload.fullName,
    //   message: payload.message || 'no hay mensaje', //payload.message,
    // });

    //Emitir evento a todos menos al cliente
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy yo', //payload.fullName,
    //   message: payload.message || 'no hay mensaje', //payload.message,
    // });

    //Todos
    this.wss.emit('messages-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id), //payload.fullName,
      message: payload.message || 'no hay mensaje', //payload.message,
    });
  }
}
