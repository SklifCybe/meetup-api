import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

// todo: change folder structure

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    config();

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    await app.listen(process.env.PORT);
}
bootstrap();
