// src/services/cryptography.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptographyService {
  private readonly logger = new Logger(CryptographyService.name);
  private readonly algorithm = 'aes-256-cbc';
  private readonly key = crypto.randomBytes(32);
  private readonly iv = crypto.randomBytes(16);

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    this.logger.log(`Data encrypted: ${encrypted}`);
    return encrypted;
  }

  decrypt(encrypted: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    this.logger.log(`Data decrypted: ${decrypted}`);
    return decrypted;
  }

  hash(data: string): string {
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    this.logger.log(`Data hashed: ${hash}`);
    return hash;
  }

  sign(data: string): string {
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    const privateKey = '-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----';
    const signature = sign.sign(privateKey, 'hex');
    this.logger.log(`Data signed: ${signature}`);
    return signature;
  }
}
