import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';

@Module({
  controllers: [PaymentController],
  providers: [PaymentRepository, PrismaService, PaymentService],
})
export class PaymentModule {}
