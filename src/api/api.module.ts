import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AiController } from './ai.controller';
import { DataProcessingController } from './dataProcessing.controller';
import { LoggingController } from './logging.controller';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { DataProcessingService } from '../services/dataProcessing.service';
import { LoggingService } from '../services/logging.service';

@Module({
  controllers: [
    UserController,
    AiController,
    DataProcessingController,
    LoggingController,
  ],
  providers: [
    UserService,
    AuthenticationService,
    DataProcessingService,
    LoggingService,
  ],
})
export class ApiModule {}
