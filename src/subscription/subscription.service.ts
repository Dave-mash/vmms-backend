import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  @Post()
  async createSubscription(link_org: string, payload: any) {
    try {
      if (!link_org) throw new NotFoundException('Org not found!');
      const subscriptionTypes = ['gold', 'platinum', 'silver', 'bronze'];
      const { subscriptionType } = payload;
      if (!subscriptionTypes.includes(subscriptionType)) {
        throw new BadRequestException('Invalid subscription type.');
      }

      const existingOrg =
        await this.subscriptionRepository.getsubscriptionByLinkOrg(link_org);
      if (existingOrg) {
        const subscriptionUpdates = {
          subscription_type: subscriptionType,
          active: true,
        };
        const updatedSubscription =
          await this.subscriptionRepository.updatesubscription(
            link_org,
            subscriptionUpdates,
          );

        return {
          msg: 'Success',
          newSubscription: updatedSubscription,
        };
      }
      const subscriptionPayload = {
        link_organisation: link_org,
        subscription_type: subscriptionType,
        active: true,
      };
      const newSubscription =
        await this.subscriptionRepository.createsubscription(
          subscriptionPayload,
        );
      return {
        msg: 'Success',
        newSubscription,
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw e;
    }
  }
}
