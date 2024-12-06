// src/services/blockchain.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Server, TransactionBuilder, Networks, Operation, Keypair } from 'stellar-sdk';
import { PiNetwork } from 'pi-network-sdk';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private stellarServer: Server;
  private piNetwork: PiNetwork;

  constructor() {
    this.stellarServer = new Server('https://horizon.stellar.org');
    this.piNetwork = new PiNetwork('https://api.pi.network');
  }

  async getAccountBalance(accountId: string): Promise<number> {
    const account = await this.stellarServer.loadAccount(accountId);
    return account.balances.reduce((total, balance) => total + parseFloat(balance.balance), 0);
  }

  async sendStellarTransaction(sourceSecret: string, destinationId: string, amount: string): Promise<string> {
    const sourceKeypair = Keypair.fromSecret(sourceSecret);
    const account = await this.stellarServer.loadAccount(sourceKeypair.publicKey());
    const transaction = new TransactionBuilder(account, { fee: await this.stellarServer.fetchBaseFee(), networkPassphrase: Networks.PUBLIC })
      .addOperation(Operation.payment({
        destination: destinationId,
        asset: Asset.native(),
        amount: amount,
      }))
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);
    const result = await this.stellarServer.submitTransaction(transaction);
    this.logger.log(`Transaction successful: ${result.hash}`);
    return result.hash;
  }

  async minePi(): Promise<any> {
    const result = await this.piNetwork.mine();
    this.logger.log(`Pi mined: ${result}`);
    return result;
  }

  async getPiNetworkInfo(): Promise<any> {
    const info = await this.piNetwork.getInfo();
    return info;
  }
}
