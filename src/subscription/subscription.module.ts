import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionService } from './subscription.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionRepository, PrismaService, SubscriptionService],
})
export class SubscriptionModule {}
