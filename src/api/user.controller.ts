import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthenticationService,
  ) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.userService.createUser (user);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }): Promise<string> {
    const user = await this.userService.findByEmail(credentials.email);
    const isValid = await this.authService.verifyPassword(credentials.password, user.password);
    if (isValid) {
      return this.authService.generateToken({ id: user.id, email: user.email });
    }
    throw new Error('Invalid credentials');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser (@Param('id') id: string): Promise<User> {
    return this.userService.getUser (id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUser (@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser (id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser (@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser (id);
  }
}
