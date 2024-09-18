import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async userLogin(userPayload: any) {
    try {
      const payload = { sub: userPayload?.tsid };
      const sys_access_token = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '60m',
      });

      return {
        msg: 'Success',
        access_token: sys_access_token,
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw new BadRequestException('Resource not found!');
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
