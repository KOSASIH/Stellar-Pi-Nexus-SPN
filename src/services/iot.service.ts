// src/services/iot.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { MqttClient, connect } from 'mqtt';

@Injectable()
export class IotService {
  private readonly logger = new Logger(IotService.name);
  private mqttClient: MqttClient;

  constructor() {
    this.mqttClient = connect('mqtt://broker.hivemq.com');
    this.mqttClient.on('connect', () => {
      this.logger.log('Connected to MQTT broker.');
    });
    this.mqttClient.on('error', (error) => {
      this.logger.error(`MQTT error: ${error}`);
    });
  }

  publish(topic: string, message: string): void {
    this.mqttClient .publish(topic, message, (error) => {
      if (error) {
        this.logger.error(`Failed to publish message: ${error}`);
      } else {
        this.logger.log(`Message published to ${topic}: ${message}`);
      }
    });
  }

  subscribe(topic: string): void {
    this.mqttClient.subscribe(topic, (error) => {
      if (error) {
        this.logger.error(`Failed to subscribe to topic ${topic}: ${error}`);
      } else {
        this.logger.log(`Subscribed to topic: ${topic}`);
      }
    });

    this.mqttClient.on('message', (topic, message) => {
      this.logger.log(`Received message from ${topic}: ${message.toString()}`);
    });
  }
}
