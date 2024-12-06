// src/services/authorization.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Role } from './role.enum';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);

  async hasRole(user: any, role: Role): Promise<boolean> {
    return user.roles.includes(role);
  }

  async hasPermission(user: any, permission: string): Promise<boolean> {
    return user.permissions.includes(permission);
  }
}
