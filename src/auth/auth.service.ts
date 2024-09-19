import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { generateTSID } from 'packages/shared-packages/src/utils';
import { githubLogin } from 'src/utils/auth';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string, saltRounds = 10): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }
  async decodePassword(password: string, hashedPassword: string): Promise<any> {
    return bcrypt.compare(password, hashedPassword);
  }

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
  async registerUser(userPayload: any, authToken: string) {
    if (authToken) {
      const response: { data: { login: string } } | any =
        await githubLogin(authToken);
      const { login } = response?.data;

      userPayload['username'] = login;
    }
    const existingUser = await this.userRepository.getUserByUsernameOrPhone(
      userPayload['phone'],
      userPayload['username'],
    );
    if (existingUser) {
      throw new ConflictException('User already exists. Try to log in.');
    }

    userPayload['tsid'] = generateTSID();
    userPayload['password'] = await this.hashPassword(userPayload['password']);
    const newUser = await this.userRepository.createUser(userPayload);

    return {
      ...newUser,
      password: null,
    };
  }
  async registerSubUser(current_user, userPayload: any) {
    try {
      const {
        role: { role_type },
        organisation,
        subscription,
      } = current_user;
      const authorizedUser =
        role_type === 'Admin' && organisation && subscription?.active;
      if (!authorizedUser) {
        throw new ForbiddenException('Action not allowed!');
      }

      const { username, phone, password } = userPayload;
      const existingUser = await this.userRepository.getUserByUsernameOrPhone(
        phone,
        username,
      );
      if (existingUser) {
        throw new ConflictException('User already exists. Try to log in.');
      }

      const finalUserPayload = {
        ...userPayload,
        password: await this.hashPassword(password),
        tsid: generateTSID(),
      };
      const newUser = await this.userRepository.createUser(finalUserPayload);

      return newUser;
    } catch (e) {
      throw e;
    }
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
