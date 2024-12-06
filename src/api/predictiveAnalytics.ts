import * as tf from '@tensorflow/tfjs';
import { TransactionData } from './models/TransactionData';

export class PredictiveAnalytics {
    private model: tf.LayersModel;

    constructor() {
        this.model = this.createModel();
    }

    private createModel(): tf.LayersModel {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }));
        model.add(tf.layers.dense({ units: 1, activation: 'linear' }));
        model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
        return model;
    }

    public async train(data: TransactionData[]) {
        const xs = tf.tensor2d(data.map(d => [d.amount, d.timestamp, ...d.otherFeatures]));
        const ys = tf.tensor2d(data.map(d => d.futureValue));
        await this.model.fit(xs, ys, { epochs: 100 });
    }

    public async predict(input: number[]): Promise<number> {
        const prediction = this.model.predict(tf.tensor2d([input])) as tf.Tensor;
        return prediction.dataSync()[0];
    }
}
