export interface PiConfig {
  apiKey: string;
  network: string;
  nodeUrl: string;
}

export const pi: PiConfig = {
  apiKey: process.env.PI_API_KEY || 'YOUR_PI_API_KEY',
  network: 'testnet', // or 'mainnet'
  nodeUrl: 'https://node-testnet.pi.com' // or 'https://node.pi.com'
};
