import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Patch, Param } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';

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
  async register(@Body() body: RegisterDto) {
    const { username, password, role = 'user' } = body; // Default role is 'user'
    return this.authService.register(username, password, role);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
