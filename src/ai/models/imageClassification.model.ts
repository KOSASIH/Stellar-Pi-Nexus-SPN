// src/ai/models/imageClassification.model.ts
import * as tf from '@tensorflow/tfjs-node';

export class ImageClassificationModel {
  private model: tf.LayersModel;

  constructor() {
    this.model = this.createModel();
  }

  private createModel(): tf.LayersModel {
    const model = tf.sequential();
    model.add(tf.layers.conv2d({ filters: 32, kernelSize: 3, activation: 'relu', inputShape: [64, 64, 3] }));
    model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
    model.add(tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }));
    model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 10, activation: 'softmax' })); // Assuming 10 classes
    model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });
    return model;
  }

  async train(images: tf.Tensor[], labels: tf.Tensor): Promise<void> {
    await this.model.fit(tf.stack(images), labels, { epochs: 50 });
  }

  async predict(image: tf.Tensor): Promise<number> {
    const prediction = this.model.predict(image.expandDims(0)) as tf.Tensor;
    return prediction.argMax(-1).dataSync()[0];
  }
}
