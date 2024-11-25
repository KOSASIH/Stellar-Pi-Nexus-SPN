const mongoose = require('mongoose');

// Database configuration settings
const dbConfig = {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/your_database_name',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
};

// Function to connect to the database
async function connectToDatabase() {
    try {
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = { dbConfig, connectToDatabase };
