import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { VMInstanceRepository } from './instance.repository';

@Injectable()
export class VMInstanceService {
  constructor(private instanceRepository: VMInstanceRepository) {}

  @Post()
  async createInstance(current_user, instancePayload: any) {
    try {
      const currentSubscription = current_user['subscription'];
      console.log(':::::::::::::::: ', currentSubscription);
      if (!currentSubscription?.active) {
        throw new BadRequestException(
          'Failed! Please upgrade your subscription to proceed.',
        );
      }
      const { name } = instancePayload;
      const existingVM = await this.instanceRepository.getInstanceByName(
        name.toLowerCase(),
      );
      if (existingVM) {
        throw new ConflictException('Please choose a different name.');
      }
      instancePayload['vm_id'] = uuidv4();
      instancePayload['name'] = name.toLowerCase();
      const newInstance =
        await this.instanceRepository.createInstance(instancePayload);

      // Shedule background process

      return {
        msg: 'Success',
        newInstance,
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw e;
    }
  }

  async moveInstance() {
    try {
      // Shedule background process

      return {
        msg: 'Success',
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw new NotFoundException('Resource not found!');
    }
  }

  async deleteInstance() {
    try {
      // Shedule background process

      return {
        msg: 'Success',
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw new NotFoundException('Resource not found!');
    }
  }
}
