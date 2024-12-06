import { Injectable } from '@nestjs/common';

@Injectable()
export class DataProcessingService {
  normalize(data: number[][]): number[][] {
    // Implement normalization logic
    return data.map(row => {
      const max = Math.max(...row);
      return row.map(value => value / max);
    });
  }

  extractFeatures(data: number[][]): number[][] {
    // Implement feature extraction logic
    return data.map(row => {
      return row.filter((_, index) => index % 2 === 0); // Example: extract every second feature
    });
  }
}
