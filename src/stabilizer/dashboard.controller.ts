// dashboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('performance')
    getPerformanceData() {
        return this.analyticsService.getPerformanceMetrics();
    }
}
