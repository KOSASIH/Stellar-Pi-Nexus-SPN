// src/services/networking.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { WebSocket } from 'ws';

@Injectable()
export class NetworkingService {
  private readonly logger = new Logger(NetworkingService.name);
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('ws://example.com/socket');
    this.ws.on('open', () => {
      this.logger.log('WebSocket connection established.');
    });
    this.ws.on('message', (data) => {
      this.logger.log(`WebSocket message received: ${data}`);
    });
  }

  async makeHttpRequest(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      this.logger.log(`HTTP request successful: ${response.data}`);
      return response.data;
    } catch (error) {
      this.logger.error(`HTTP request failed: ${error}`);
      throw error;
    }
  }

  sendWebSocketMessage(message: string): void {
    this.ws.send(message, (error) => {
      if (error) {
        this.logger.error(`Failed to send WebSocket message: ${error}`);
      } else {
        this.logger.log(`WebSocket message sent: ${message}`);
      }
    });
  }
}
