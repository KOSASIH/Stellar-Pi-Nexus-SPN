// src/services/logging.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);
  private logLevel = 'info';

  async log(level: string, message: string): Promise<void> {
    const logger = winston.createLogger({
      level: this.logLevel,
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
    logger.log(level, message);
  }
}
