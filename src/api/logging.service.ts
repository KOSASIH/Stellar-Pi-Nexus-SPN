import { Injectable } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';

@Injectable()
export class LoggingService {
  private logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.json(),
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'combined.log' }),
    ],
  });

  async log(level: string, message: string): Promise<void> {
    this.logger.log({ level, message });
  }
}
