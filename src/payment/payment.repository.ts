import { Injectable } from '@nestjs/common';
import { payment } from '@prisma/client';
import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentRepository {
  constructor(private prismaService: PrismaService) {}

  async createPayment(data: any): Promise<payment | null> {
    const payment = await this.prismaService?.payment?.create({
      data: {
        ...data,
        tsid: generateTSID(),
      },
    });

    return payment;
  }

  async updatePayment(tsid: string, data: any): Promise<payment | null> {
    const payment = await this.prismaService?.payment?.update({
      where: { tsid },
      data: {
        ...data,
      },
    });

    return payment;
  }
}
