// src/services/ai.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private model: tf.LayersModel;

  constructor() {
    this.initializeModel();
  }

  private async initializeModel() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }));
    this.model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    this.logger.log('AI model initialized.');
  }

  async trainModel(trainingData: number[][], labels: number[]): Promise<void> {
    const xs = tf.tensor2d(trainingData);
    const ys = tf.tensor2d(labels, [labels.length, 1]);
    await this.model.fit(xs, ys, { epochs: 100 });
    this.logger.log('AI model trained.');
  }

  async predict(data: number[]): Promise<number> {
    const inputTensor = tf.tensor2d([data]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    return prediction.dataSync()[0];
  }
}
