// src/services/database.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private connection: Connection;

  constructor() {
    this.createConnection();
  }

  private async createConnection() {
    this.connection = await createConnection({
      type: 'postgres',
      url: 'postgres://user:password@localhost:5432/database',
      entities: [User ],
      synchronize: true,
    });
    this.logger.log('Database connection established.');
  }

  async getUser(id: number): Promise<User> {
    return this.connection.getRepository(User).findOne(id);
  }

  async createUser(user: User): Promise<User> {
    return this.connection.getRepository(User).save(user);
  }

  async updateUser(id: number, user: User): Promise<User> {
    return this.connection.getRepository(User).update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.connection.getRepository(User).delete(id);
  }
}
