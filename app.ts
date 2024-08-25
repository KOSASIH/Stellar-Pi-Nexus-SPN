import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StellarService } from './services/stellar.service';
import { PiService } from './services/pi.service';
import { CryptoUtils } from './utils/crypto.utils';
import { MathUtils } from './utils/math.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialize Stellar and Pi services
  const stellarService = app.get(StellarService);
  const piService = app.get(PiService);

  // Initialize crypto and math utilities
  const cryptoUtils = new CryptoUtils();
  const mathUtils = new MathUtils();

  // Set up AI-driven predictive analytics and cybersecurity threat detection
  const aiModel = await import('./ai/model');
  const threatDetector = await import('./cybersecurity/threat-detector');

  // Define API endpoints
  app.get('/stellar/balance/:accountId', async (req, res) => {
    const accountId = req.params.accountId;
    const balance = await stellarService.getAccountBalance(accountId);
    res.json({ balance });
  });

  app.post('/stellar/transaction', async (req, res) => {
    const fromAccountId = req.body.fromAccountId;
    const toAccountId = req.body.toAccountId;
    const amount = req.body.amount;
    const assetCode = req.body.assetCode;
    const transactionId = await stellarService.sendPayment(fromAccountId, toAccountId, amount, assetCode);
    res.json({ transactionId });
  });

  app.get('/pi/balance/:userId', async (req, res) => {
    const userId = req.params.userId;
    const balance = await piService.getUserBalance(userId);
    res.json({ balance });
  });

  app.post('/pi/transaction', async (req, res) => {
    const fromUserId = req.body.fromUserId;
    const toUserId = req.body.toUserId;
    const amount = req.body.amount;
    const transactionId = await piService.sendPayment(fromUserId, toUserId, amount);
    res.json({ transactionId });
  });

  app.post('/predict', async (req, res) => {
    const data = req.body.data;
    const prediction = await aiModel.predict(data);
    res.json({ prediction });
  });

  app.post('/detect-threat', async (req, res) => {
    const data = req.body.data;
    const threatLevel = await threatDetector.detect(data);
    res.json({ threatLevel });
  });

  await app.listen(3000);
  console.log('SPN platform listening on port 3000');
}

bootstrap();
