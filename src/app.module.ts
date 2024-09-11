import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from 'seeders/seeder.module';

@Module({
  imports: [AuthModule, SeederModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
