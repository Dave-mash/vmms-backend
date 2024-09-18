import { Injectable, Post } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { PrismaService } from 'src/prisma.service';
import { ratePlans } from 'src/utils';
import { generateTSID } from 'packages/shared-packages/src/utils';

@Injectable()
export class PaymentService {
  constructor(
    private paymentRepository: PaymentRepository,
    private prismaService: PrismaService,
  ) {}

  @Post()
  async createPayment(payload: any) {
    try {
      payload['payment_type'] = 'Bank';
      const { transaction_ref_no, amount } = payload;
      await this.paymentRepository.createPayment(payload);

      const org = await this.prismaService.organisation.findFirst({
        where: {
          payment_identifier: transaction_ref_no,
        },
      });
      if (org) {
        const { tsid } = org;
        const subscription = await this.prismaService.subscription.findUnique({
          where: {
            link_organisation: tsid,
          },
        });
        let targetPlan = null;
        const plansList = Object.entries(ratePlans);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, value] of plansList) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const constPerAnnum = new value().constPerAnnum;
          if (amount === constPerAnnum) {
            targetPlan = new value();
          }
          // console.log(`${Number(paymentPlan)}`);
        }
        if (subscription) {
          const { id } = subscription;
          const newSubscription = await this.prismaService.subscription.update({
            where: { id },
            data: {
              active: true,
              subscription_type: targetPlan.planName,
            },
          });
          return newSubscription;
        }

        const subscriptionPayload = {
          subscription_type: targetPlan.planName,
          link_organisation: tsid,
          active: true,
          tsid: generateTSID(),
        };
        await this.prismaService.subscription.create({
          data: subscriptionPayload,
        });
      }

      return {
        msg: 'Success',
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw e;
    }
  }
}
