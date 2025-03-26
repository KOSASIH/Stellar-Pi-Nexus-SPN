import { Server } from 'stellar-sdk';
import { stellarServer } from '../../config';

class TransactionMonitor {
    async watchTransaction(transactionHash: string) {
        stellarServer.transactions()
            .transaction(transactionHash)
            .call()
            .then((response) => {
                console.log(`Status for transaction ${transactionHash}:`, response.successful ? 'Success' : 'Failed');
            })
            .catch((error) => {
                console.error(`Error watching transaction ${transactionHash}:`, error);
            });
    }
}

export default new TransactionMonitor();
