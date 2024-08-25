import { Injectable } from '@nestjs/common';
import { PiSdk } from 'pi-sdk';
import { PiDataLoader } from '../data/pi_data_loader';

@Injectable()
export class PiService {
  private piSdk: PiSdk;
  private piDataLoader: PiDataLoader;

  constructor() {
    this.piSdk = new PiSdk('YOUR_API_KEY', 'YOUR_API_SECRET');
    this.piDataLoader = new PiDataLoader(this.piSdk);
  }

  async getUserBalance(userId: string): Promise<number> {
    const user = await this.piDataLoader.loadUser(userId);
    return user.balance;
  }

  async getTransactionHistory(userId: string, start_time: string, end_time: string): Promise<any[]> {
    const transactions = await this.piDataLoader.loadTransactions(userId, start_time, end_time);
    return transactions;
  }

  async sendPayment(fromUserId: string, toUserId: string, amount: number): Promise<string> {
    const fromUser = await this.piDataLoader.loadUser(fromUserId);
    const toUser = await this.piDataLoader.loadUser(toUserId);
    const transaction = await this.piSdk.createTransaction(fromUser, toUser, amount);
    await this.piSdk.submitTransaction(transaction);
    return transaction.id;
  }

  async createUser(): Promise<string> {
    const newUser = await this.piSdk.createUser();
    return newUser.id;
  }

  async fundUser(userId: string, amount: number): Promise<void> {
    const user = await this.piDataLoader.loadUser(userId);
    await this.piSdk.fundUser(user, amount);
  }
}
