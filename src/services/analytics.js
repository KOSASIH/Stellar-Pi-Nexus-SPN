const express = require('express');
const { Client } = require('pg'); // PostgreSQL client for database interaction
const { Kafka } = require('kafkajs'); // Kafka for real-time data streaming
const { createCanvas } = require('canvas'); // For generating charts
const { ChartJSNodeCanvas } = require('chartjs-node-canvas'); // Chart.js for data visualization
const { FraudDetectionService } = require('./fraudDetection/service'); // Importing the fraud detection service

const app = express();
const port = 3000;

// PostgreSQL client setup
const dbClient = new Client({
    user: 'your_user',
    host: 'localhost',
    database: 'analytics_db',
    password: 'your_password',
    port: 5432,
});

// Kafka setup
const kafka = new Kafka({
    clientId: 'analytics-service',
    brokers: ['localhost:9092'],
});
const producer = kafka.producer();

// Initialize services
const fraudDetectionService = new FraudDetectionService();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
dbClient.connect();

// Start Kafka producer
const startKafkaProducer = async () => {
    await producer.connect();
    console.log('Kafka Producer connected');
};

// Endpoint to fetch analytics data
app.get('/analytics', async (req, res) => {
    try {
        const result = await dbClient.query('SELECT * FROM analytics_data');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to generate a chart
app.get('/analytics/chart', async (req, res) => {
    const width = 800;
    const height = 400;
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const configuration = {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'User  Engagement',
                data: [65, 59, 80, 81, 56],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    res.set('Content-Type', 'image/png');
    res.send(image);
});

// Endpoint to track user behavior
app.post('/analytics/track', async (req, res) => {
    const { userId, action } = req.body;

    try {
        // Log user action to the database
        await dbClient.query('INSERT INTO user_actions (user_id, action) VALUES ($1, $2)', [userId, action]);

        // Produce a message to Kafka for real-time processing
        await producer.send({
            topic: 'user-actions',
            messages: [{ value: JSON.stringify({ userId, action }) }],
        });

        res.status(201).send('User  action tracked');
    } catch (error) {
        console.error('Error tracking user action:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to analyze transactions for fraud
app.post('/analytics/fraud-check', async (req, res) => {
    const transactionData = req.body;

    try {
        const result = await fraudDetectionService.analyzeTransaction(transactionData);
        res.json({ fraudStatus: result });
    } catch (error) {
        console.error('Error analyzing transaction:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server and Kafka producer
app.listen(port, async () => {
    console.log(`Analytics service running at http://localhost:${port}`);
    await startKafkaProducer();
});
