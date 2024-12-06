// src/services/authentication.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  private secretKey = 'secretkey';

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateToken(user: any): Promise<string> {
    return jwt.sign(user, this.secretKey, { expiresIn: '1h' });
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, this.secretKey);
  }
}
