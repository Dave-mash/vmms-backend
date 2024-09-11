import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';
import { plainToClass } from 'class-transformer';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('HERE WE GO...');
    const request = context.switchToHttp().getRequest();
    const username = this.extractTokenFromHeader(request);
    console.log(username, 'here is the token');

    if (!username) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.prismaService.user_profile.findUnique({
        where: { username },
      });
      const { tsid: link_user } = user;
      const role = await this.prismaService.user_role.findUnique({
        where: { link_user },
      });
      console.log(':::::::::: ', link_user);
      // const subscription = await this.prismaService.subscription.findUnique({
      //   where: { link_user },
      // });
      const userPayload: CreateAuthDto = plainToClass(CreateAuthDto, user);
      // userPayload['organisation'] = org;
      userPayload['subscription'] = null;
      userPayload['role'] = role;
      request['current_user'] = userPayload;
    } catch (e) {
      console.log(e, 'here is the error');

      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
