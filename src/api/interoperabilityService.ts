import { ethers } from 'ethers';

export class InteroperabilityService {
    private provider: ethers.providers.JsonRpcProvider;

    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
    }

    public async sendEthereumTransaction(amount: string, recipient: string): Promise<string> {
        const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', this.provider);
        const tx = await wallet.sendTransaction({
            to: recipient,
            value: ethers.utils.parseEther(amount)
        });
        return tx.hash;
    }
}
