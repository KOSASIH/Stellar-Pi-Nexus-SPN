// src/ai/models/sentimentAnalysis.model.ts
import * as tf from '@tensorflow/tfjs-node';

export class SentimentAnalysisModel {
  private model: tf.LayersModel;

  constructor() {
    this.model = this.createModel();
  }

  private createModel(): tf.LayersModel {
    const model = tf.sequential();
    model.add(tf.layers.embedding({ inputDim: 10000, outputDim: 128, inputLength: 100 })); // Assuming vocab size of 10,000
    model.add(tf.layers.bidirectional({ layer: tf.layers.lstm({ units: 64 }) }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' })); // Binary classification
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    return model;
  }

  async train(data: tf.Tensor, labels: tf.Tensor): Promise<void> {
    await this.model.fit(data, labels, { epochs: 10 });
  }

  async predict(input: tf.Tensor): Promise<number> {
    const prediction = this.model.predict(input) as tf.Tensor;
    return prediction.dataSync()[0 ];
  }
}
