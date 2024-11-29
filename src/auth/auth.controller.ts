import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Patch, Param } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Patch('promote/:id')
@Roles('admin') // Only admins can promote
@UseGuards(JwtAuthGuard, RolesGuard)
async promoteToAdmin(@Param('id') id: string) {
  return this.authService.promoteToAdmin(Number(id));
}
@Post('register')
async register(
  @Body() body: { username: string; password: string; role?: 'user' | 'admin' },
) {
  const role = body.role || 'user'; // Default to 'user' if no role is provided
  return this.authService.register(body.username, body.password, role);
}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
