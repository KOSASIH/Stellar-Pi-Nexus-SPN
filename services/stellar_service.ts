import { Injectable } from '@nestjs/common';
import { StellarSdk } from 'stellar-sdk';
import { StellarDataLoader } from '../data/stellar_data_loader';

@Injectable()
export class StellarService {
  private stellarSdk: StellarSdk;
  private stellarDataLoader: StellarDataLoader;

  constructor() {
    this.stellarSdk = new StellarSdk('https://horizon.stellar.org');
    this.stellarDataLoader = new StellarDataLoader('https://horizon.stellar.org', 'public');
  }

  async getAccountBalance(accountId: string): Promise<number> {
    const account = await this.stellarDataLoader.loadAccount(accountId);
    return account.balance;
  }

  async getTransactionHistory(accountId: string, start_time: string, end_time: string): Promise<any[]> {
    const transactions = await this.stellarDataLoader.loadTransactions(accountId, start_time, end_time);
    return transactions;
  }

  async sendPayment(fromAccountId: string, toAccountId: string, amount: number, assetCode: string): Promise<string> {
    const fromAccount = await this.stellarDataLoader.loadAccount(fromAccountId);
    const toAccount = await this.stellarDataLoader.loadAccount(toAccountId);
    const transaction = await this.stellarSdk.buildTransaction(fromAccount, toAccount, amount, assetCode);
    await this.stellarSdk.submitTransaction(transaction);
    return transaction.id;
  }

  async createAccount(): Promise<string> {
    const newAccount = await this.stellarSdk.createAccount();
    return newAccount.id;
  }

  async fundAccount(accountId: string, amount: number): Promise<void> {
    const account = await this.stellarDataLoader.loadAccount(accountId);
    await this.stellarSdk.fundAccount(account, amount);
  }
}
