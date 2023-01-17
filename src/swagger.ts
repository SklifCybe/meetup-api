import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const useSwagger = (app: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle('Meetup API')
        .addBearerAuth()
        .setContact(
            'Ilya Strelkovskiy',
            'https://github.com/SklifCybe',
            'i.s.toaccept@gmail.com',
        )
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document);
};
