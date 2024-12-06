// smartContracts.ts

import { ethers } from "ethers";

// Define the smart contract ABI (Application Binary Interface)
const contractABI = [
    "function createContract(string memory name, uint256 value) public returns (uint256)",
    "function executeContract(uint256 contractId) public",
    "function getContractDetails(uint256 contractId) public view returns (string memory, uint256, address)",
    "event ContractCreated(uint256 indexed contractId, string name, uint256 value, address creator)",
    "event ContractExecuted(uint256 indexed contractId, address executor)"
];

// Smart Contract Class
class SmartContract {
    private provider: ethers.providers.Web3Provider;
    private signer: ethers.Signer;
    private contractAddress: string;
    private contract: ethers.Contract;

    constructor(providerUrl: string, contractAddress: string) {
        this.provider = new ethers.providers.Web3Provider(new ethers.providers.JsonRpcProvider(providerUrl));
        this.contractAddress = contractAddress;
        this.signer = this.provider.getSigner();
        this.contract = new ethers.Contract(this.contractAddress, contractABI, this.signer);
    }

    // Create a new contract
    async createContract(name: string, value: number): Promise<number> {
        const tx = await this.contract.createContract(name, value);
        const receipt = await tx.wait();
        const contractId = receipt.events[0].args.contractId;
        console.log(`Contract created with ID: ${contractId}`);
        return contractId;
    }

    // Execute a contract
    async executeContract(contractId: number): Promise<void> {
        const tx = await this.contract.executeContract(contractId);
        await tx.wait();
        console.log(`Contract with ID ${contractId} executed.`);
    }

    // Get contract details
    async getContractDetails(contractId: number): Promise<{ name: string; value: number; creator: string }> {
        const details = await this.contract.getContractDetails(contractId);
        return {
            name: details[0],
            value: details[1].toNumber(),
            creator: details[2]
        };
    }
}

// Example usage
(async () => {
    const providerUrl = "https://your.ethereum.node"; // Replace with your Ethereum node URL
    const contractAddress = "0xYourContractAddress"; // Replace with your deployed contract address

    const smartContract = new SmartContract(providerUrl, contractAddress);

    // Create a new contract
    const contractId = await smartContract.createContract("Sample Contract", 1000);

    // Get contract details
    const details = await smartContract.getContractDetails(contractId);
    console.log(`Contract Details:`, details);

    // Execute the contract
    await smartContract.executeContract(contractId);
})();
