const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon.stellar.org');

// Function to get account balance
async function getAccountBalance(accountId) {
    try {
        const account = await server.loadAccount(accountId);
        return account.balances;
    } catch (error) {
        console.error('Error fetching account balance:', error);
        throw new Error('Unable to fetch account balance');
    }
}

// Function to send payment
async function sendPayment(sourceSecret, destinationId, amount) {
    try {
        const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecret);
        const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

        const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.PUBLIC,
        })
        .addOperation(StellarSdk.Operation.payment({
            destination: destinationId,
            asset: StellarSdk.Asset.native(),
            amount: amount,
        }))
        .setTimeout(30)
        .build();

        transaction.sign(sourceKeypair);
        const result = await server.submitTransaction(transaction);
        return result;
    } catch (error) {
        console.error('Error sending payment:', error);
        throw new Error('Payment transaction failed');
    }
}

// Function to get transaction history
async function getTransactionHistory(accountId) {
    try {
        const transactions = await server.transactions()
            .forAccount(accountId)
            .order('desc')
            .limit(10)
            .call();
        return transactions.records;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        throw new Error('Unable to fetch transaction history');
    }
}

module.exports = { getAccountBalance, sendPayment, getTransactionHistory };
