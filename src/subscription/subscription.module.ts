import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionService } from './subscription.service';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentRepository } from 'src/payment/payment.repository';

@Module({
  imports: [PaymentModule],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionRepository,
    PrismaService,
    SubscriptionService,
    PaymentRepository,
  ],
})
export class SubscriptionModule {}
