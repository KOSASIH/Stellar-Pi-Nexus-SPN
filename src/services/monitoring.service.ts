// src/services/monitoring.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as os from 'os';
import * as cpuUsage from 'cpu-usage';

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name);

  async getSystemResources(): Promise<any> {
    return {
      cpu: os.cpus(),
      memory: os.freemem(),
      disk: os.totalmem(),
    };
  }

  async getApplicationPerformance(): Promise<any> {
    return cpuUsage();
  }
}
