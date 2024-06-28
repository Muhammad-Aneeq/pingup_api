import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  // Enable CORS
  app.enableCors({
    origin: 'https://pingup-frontend.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Handle preflight requests
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Origin',
        'https://pingup-frontend.vercel.app',
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, Authorization',
      );
      return res.sendStatus(204);
    }
    next();
  });
  await app.listen(3000);
}
bootstrap();
