import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from 'seeders/seeder.module';
import { VMInstanceModule } from './instance/instance.module';
import { OrganisationModule } from './organisation/organisation.module';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';
import { SubscriptionModule } from './subscription/subscription.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule,
    SeederModule,
    VMInstanceModule,
    OrganisationModule,
    SubscriptionModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaClient, PrismaService],
})
export class AppModule {}
