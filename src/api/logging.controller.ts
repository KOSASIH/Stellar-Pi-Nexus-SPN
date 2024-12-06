import { Controller, Post, Body } from '@nestjs/common';
import { LoggingService } from '../services/logging.service';

@Controller('logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Post('log')
  async log(@Body() { level, message }: { level: string; message: string }): Promise<void> {
    await this.loggingService.log(level, message);
  }
}
