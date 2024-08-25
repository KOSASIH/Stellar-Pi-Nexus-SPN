export interface NetworkConfig {
  stellar: {
    node: string;
    port: number;
  };
  pi: {
    node: string;
    port: number;
  };
}

export const network: NetworkConfig = {
  stellar: {
    node: process.env.STELLAR_NODE || 'https://stellar-node.com',
    port: parseInt(process.env.STELLAR_PORT, 10) || 8000
  },
  pi: {
    node: process.env.PI_NODE || 'https://pi-node.com',
    port: parseInt(process.env.PI_PORT, 10) || 8080
  }
};
