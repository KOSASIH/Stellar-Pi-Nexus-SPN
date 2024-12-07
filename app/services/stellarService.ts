import { Server, Keypair, TransactionBuilder, Networks, BASE_FEE, Operation, Memo } from 'stellar-sdk';
import { stellarServer, encryptData, decryptData } from '../../config';

class StellarService {
    async createAccount(): Promise<{ publicKey: string; encryptedSecret: string }> {
        const keypair = Keypair.random();
        const publicKey = keypair.publicKey();
        const encryptedSecret = encryptData(keypair.secret());

        // Fund akun di testnet untuk testing (gunakan faucet)
        await stellarServer.friendbot(publicKey).call();

        return { publicKey, encryptedSecret };
    }

    async createTransaction(
        sourceSecret: string,
        destination: string,
        amount: string,
        memoText: string,
        multiSigSecret?: string
    ) {
        const sourceKeypair = Keypair.fromSecret(sourceSecret);
        const sourceAccount = await stellarServer.loadAccount(sourceKeypair.publicKey());

        const transaction = new TransactionBuilder(sourceAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        })
            .addOperation(Operation.payment({
                destination,
                asset: stellarServer.Asset.native(),
                amount
            }))
            .addMemo(Memo.text(memoText))
            .setTimeout(180)
            .build();

        // Multi-sig: Jika ada multiSigSecret, tambahkan tanda tangan kedua
        transaction.sign(sourceKeypair);
        if (multiSigSecret) {
            const multiSigKeypair = Keypair.fromSecret(multiSigSecret);
            transaction.sign(multiSigKeypair);
        }

        return await stellarServer.submitTransaction(transaction);
    }

    async monitorTransaction(transactionHash: string) {
        return stellarServer.transactions()
            .transaction(transactionHash)
            .call()
            .then((response) => {
                if (response.successful) {
                    console.log(`Transaction ${transactionHash} confirmed.`);
                } else {
                    console.log(`Transaction ${transactionHash} failed.`);
                }
                return response;
            })
            .catch((error) => {
                console.error(`Error monitoring transaction ${transactionHash}:`, error);
            });
    }
}

export default new StellarService();
