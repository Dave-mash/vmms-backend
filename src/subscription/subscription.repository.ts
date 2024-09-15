import { Injectable } from '@nestjs/common';
import { subscription } from '@prisma/client';
import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubscriptionRepository {
  constructor(private app: PrismaService) {}

  async createsubscription(data: any): Promise<subscription | null> {
    const subscription = await this.app?.subscription?.create({
      data: {
        ...data,
        tsid: generateTSID(),
      },
    });

    return subscription;
  }

  async updatesubscription(
    link_organisation: string,
    updates: any,
  ): Promise<subscription | null> {
    const subscription = await this.app?.subscription?.update({
      where: { link_organisation },
      data: { ...updates },
    });

    return subscription;
  }

  async getsubscriptionByName(
    subscription_type: string,
  ): Promise<subscription | null> {
    if (!subscription_type) return null;

    const subscription = await this.app?.subscription?.findFirst({
      where: { subscription_type },
    });

    return subscription;
  }

  async getsubscriptionByLinkOrg(
    link_organisation: string,
  ): Promise<subscription | null> {
    const subscription = await this.app?.subscription?.findUnique({
      where: { link_organisation },
    });

    return subscription;
  }
}
