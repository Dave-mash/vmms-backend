import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRepository } from './user.repository';
import { generateTSID } from 'packages/shared-packages/src/utils';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(userPayload: CreateAuthDto) {
    try {
      const { username } = userPayload;
      const existingUser = await this.userRepository.getUserByUsername(
        username.toLowerCase(),
      );
      if (!existingUser) {
        const payload = {
          ...userPayload,
          tsid: generateTSID(),
          username: username.toLowerCase(),
        };
        await this.userRepository.createUser(payload);
      } else {
        const payload = {
          ...userPayload,
          username: username.toLowerCase(),
        };
        console.log(payload);
        await this.userRepository.updateUser(username.toLowerCase(), payload);
      }

      return {
        msg: 'Success',
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw new BadRequestException('An error occured!');
    }
  }
  create() {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
