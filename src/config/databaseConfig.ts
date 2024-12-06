import mongoose from 'mongoose';
import { envConfig } from './envConfig';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(envConfig.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
