import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(MainModule, { cors: true });

  app.setGlobalPrefix('api/v1');
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('Test example')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT || DEFAULT_PORT);
}
bootstrap();
