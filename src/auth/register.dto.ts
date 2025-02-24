import { IsString, IsOptional, IsIn, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).*)/, {
    message: 'Password must include an uppercase letter, a number, and a special character',
  })
  password: string;

  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role?: 'user' | 'admin';
}
