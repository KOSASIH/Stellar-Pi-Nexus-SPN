export interface StellarConfig {
  apiKey: string;
  network: string;
  horizonUrl: string;
}

export const stellar: StellarConfig = {
  apiKey: process.env.STELLAR_API_KEY || 'YOUR_STELLAR_API_KEY',
  network: 'testnet', // or 'mainnet'
  horizonUrl: 'https://horizon-testnet.stellar.org' // or 'https://horizon.stellar.org'
};
