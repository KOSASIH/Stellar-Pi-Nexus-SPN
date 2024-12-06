import * as tf from '@tensorflow/tfjs';

export class PredictiveAnalytics {
    private model: tf.LayersModel;

    constructor() {
        this.model = this.createModel();
    }

    private createModel(): tf.LayersModel {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
        model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
        return model;
    }

    async train(data: tf.Tensor, labels: tf.Tensor): Promise<void> {
        await this.model.fit(data, labels, { epochs: 100 });
    }

    async predict(input: tf.Tensor): Promise<number> {
        const prediction = this.model.predict(input) as tf.Tensor;
        return prediction.dataSync()[0];
    }
}
