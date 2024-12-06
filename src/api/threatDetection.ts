import { KMeans } from 'ml-kmeans';
import { TransactionData } from './models/TransactionData';

export class ThreatDetection {
    public detectAnomalies(data: TransactionData[]): number[] {
        const kmeans = new KMeans({ k: 2 });
        const clusters = kmeans.cluster(data.map(d => [d.amount, d.timestamp, ...d.otherFeatures]));
        return clusters.map(cluster => cluster.centroid);
    }
}
