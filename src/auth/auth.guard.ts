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
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('HERE WE GO...');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user = await this.prismaService.user_profile.findUnique({
        where: { tsid: payload?.sub },
      });
      const { tsid: link_user } = user;
      const role = await this.prismaService.user_role.findUnique({
        where: { link_user },
      });
      const organisation = await this.prismaService.organisation.findFirst({
        where: { tsid: role?.link_organisation },
      });
      const subscription = await this.prismaService.subscription.findFirst({
        where: { link_organisation: organisation?.tsid },
      });
      const userPayload: CreateAuthDto = plainToClass(CreateAuthDto, user);
      // userPayload['organisation'] = org;
      userPayload['organisation'] = organisation;
      userPayload['subscription'] = subscription;
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
