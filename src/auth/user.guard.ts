import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('HERE WE GO...');
    const request = context.switchToHttp().getRequest();
    const access_token = this.extractTokenFromHeader(request);

    if (!access_token) {
      throw new UnauthorizedException();
    }

    try {
      // const access_token = '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';
      const githubProfileURL = 'https://api.github.com/user';
      const headers = {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${access_token}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      };
      const guestUser = access_token === 'Guest';
      const guestPayload = {
        data: {
          login: 'Guest',
          name: 'Guest',
        },
      };
      let response = null;
      response = guestUser
        ? guestPayload
        : await axios.get(githubProfileURL, headers);
      console.log('::::::::: HERE IS THE RESOPONSE: ', response);
      const { login: username, name: full_name } = response?.data;
      // let current_user = await this.userRepository.getUserByUsername(
      //   username.toLowerCase(),
      // );
      let current_user = await this.prismaService.user_profile?.findUnique({
        where: { username: username.toLowerCase() },
      });
      if (!current_user) {
        const data = {
          tsid: generateTSID(),
          username: username.toLowerCase(),
          full_name,
        };
        current_user = await this.prismaService?.user_profile?.create({
          data: { ...data },
        });
        const { tsid: link_user } = current_user;
        await this.prismaService.user_role.create({
          data: {
            link_user,
            tsid: generateTSID(),
            role_type: 'Admin',
          },
        });
      }

      request['current_user'] = current_user;
    } catch (e) {
      console.log('::: ERROR: ', e?.response);
      // console.log(e, 'here is the error');

      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
