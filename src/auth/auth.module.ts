// // import { Module } from '@nestjs/common';
// // import { AuthController } from './auth.controller';
// // import { AuthService } from './auth.service';

// // @Module({
// //   controllers: [AuthController],
// //   providers: [AuthService]
// // })
// // export class AuthModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Use an environment variable for production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

