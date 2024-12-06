import { Controller, Post, Body } from '@nestjs/common';
import { DataProcessingService } from '../services/dataProcessing.service';

@Controller('data-processing')
export class DataProcessingController {
  constructor(private readonly dataProcessingService: DataProcessingService) {}

  @Post('normalize')
  async normalizeData(@Body() data: number[][]): Promise<number[][]> {
    return this.dataProcessingService.normalize(data);
  }

  @Post('feature-extract')
  async extractFeatures(@Body() data: number[][]): Promise<number[][]> {
    return this.dataProcessingService.extractFeatures(data);
  }
}
