import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class OrderGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('OrderGateway');

  @WebSocketServer() wss: Server;

  @SubscribeMessage('order')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    this.logger.log(`Order received`);
    this.wss.emit('prepare', text);
    return {
      event: 'order',
      data: `We received your order! You ordered: ${text}`
    };
  }

  afterInit(server: any) {
    this.logger.log(`Initialized`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
