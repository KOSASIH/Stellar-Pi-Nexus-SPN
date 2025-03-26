import express from 'express';
import { createTransaction, monitorTransaction } from './app/controllers/transactionController';
import transactionMonitor from './app/services/transactionMonitor';

const app = express();
app.use(express.json());

app.post('/transaction', createTransaction);
app.get('/monitor/:transactionHash', monitorTransaction);

// Contoh pemantauan transaksi secara periodik
setInterval(() => {
    const hashToMonitor = 'TX_HASH_SAMPLE';
    transactionMonitor.watchTransaction(hashToMonitor);
}, 60000);  // Cek setiap 60 detik

app.listen(3000, () => {
    console.log('SPN server running on port 3000');
});
