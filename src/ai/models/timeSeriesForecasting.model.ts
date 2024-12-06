// src/ai/models/timeSeriesForecasting.model.ts
import * as tf from '@tensorflow/tfjs-node';

export class TimeSeriesForecastingModel {
  private model: tf.LayersModel;

  constructor() {
    this.model = this.createModel();
  }

  private createModel(): tf.LayersModel {
    const model = tf.sequential();
    model.add(tf.layers.lstm({ units: 50, returnSequences: true, inputShape: [10, 1] }));
    model.add(tf.layers.lstm({ units: 50 }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    return model;
  }

  async train(data: number[][]): Promise<void> {
    const xs = tf.tensor3d(data);
    const ys = tf.tensor2d(data.map(d => d[d.length - 1])); // Assuming last value is the target
    await this.model.fit(xs, ys, { epochs: 100 });
  }

  async predict(input: number[][]): Promise<number> {
    const inputTensor = tf.tensor3d(input);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    return prediction.dataSync()[0];
  }
}
