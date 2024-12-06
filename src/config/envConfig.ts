import * as dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    PORT: number;
    DB_URI: string;
    STELLAR_NETWORK: string;
    PI_NETWORK_API: string;
    JWT_SECRET: string;
}

const getEnvConfig = (): EnvConfig => {
    return {
        PORT: parseInt(process.env.PORT || '3000', 10),
        DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/spn',
        STELLAR_NETWORK: process.env.STELLAR_NETWORK || 'https://horizon.stellar.org',
        PI_NETWORK_API: process.env.PI_NETWORK_API || 'https://api.p.network',
        JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    };
};

export const envConfig = getEnvConfig();
