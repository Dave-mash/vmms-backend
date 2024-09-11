import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from 'seeders/seeder.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/');

  const seederModule = app.get(SeederModule);

  await seederModule.seedAdminData();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
