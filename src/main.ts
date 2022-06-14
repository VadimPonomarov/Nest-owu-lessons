import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig = await app.get(ConfigService);
    const PORT = appConfig.get('port');

    const swagConfig = new DocumentBuilder()
        .setTitle('Nest-OWU-lesons')
        .setDescription('Nest-OWU-lesons api description')
        .setVersion('1.0')
        .addBearerAuth({type: "http", scheme: 'bearer', bearerFormat: 'Bearer'}, 'accessToken')
        .addTag('Nest-OWU-lesons')
        .build();
    const document = SwaggerModule.createDocument(app, swagConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, () => {
        console.log('Server has started on port: ' + PORT);
    });
}

bootstrap();
