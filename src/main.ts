import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { yellowText } from './common/utils/colors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    config();

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(process.env.PORT, async () => {
        const url = await app.getUrl();
        const coloredUrl = yellowText(url);

        Logger.log(`Application started on ${coloredUrl}`);
    });
}
bootstrap();
