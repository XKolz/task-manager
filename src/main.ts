import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // Default behavior for ValidationPipe
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const messages = validationErrors.map((error) => {
          const constraints = Object.values(error.constraints).join(', ');
          return `${error.property}: ${constraints}`;
        });
        return new BadRequestException(messages);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
