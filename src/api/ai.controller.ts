import { Controller, Post, Body } from '@nestjs/common';
import { TimeSeriesForecastingModel } from '../ai/models/timeSeriesForecasting.model';
import { SentimentAnalysisModel } from '../ai/models/sentimentAnalysis.model';
import * as tf from '@tensorflow/tfjs-node';

@Controller('ai')
export class AiController {
  private timeSeriesModel: TimeSeriesForecastingModel;
  private sentimentModel: SentimentAnalysisModel;

  constructor() {
    this.timeSeriesModel = new TimeSeriesForecastingModel();
    this.sentimentModel = new SentimentAnalysisModel();
  }

  @Post('time-series/train')
  async trainTimeSeries(@Body() data: number[][]): Promise<void> {
    await this.timeSeriesModel.train(data);
  }

  @Post('time-series/predict')
  async predictTimeSeries(@Body() input: number[][]): Promise<number> {
    return this.timeSeriesModel.predict(input);
  }

  @Post('sentiment/train')
  async trainSentiment(@Body() { data, labels }: { data: tf.Tensor; labels: tf.Tensor }): Promise<void> {
    await this.sentimentModel.train(data, labels);
  }

  @Post('sentiment/predict')
  async predictSentiment(@Body() input: tf.Tensor): Promise<number> {
    return this.sentimentModel.predict(input);
  }
}
