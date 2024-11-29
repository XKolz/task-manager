import { IsString, IsOptional, IsIn, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role?: 'user' | 'admin';
}
