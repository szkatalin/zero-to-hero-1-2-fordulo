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
export class KitchenGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('KitchenGateway');
  @WebSocketServer() wss: Server;

  @SubscribeMessage('prepare')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    this.logger.log(`Order received from waiter`);
    return {
      event: 'prepare',
      data: `Received the client's order! He/She ordered: ${text}`
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
