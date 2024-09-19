import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
// import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('HERE WE GO...', request.headers.auth_type);
    const auth_type = request.headers.auth_type;
    const access_token = this.extractTokenFromHeader(request);
    let username;

    if (!access_token) {
      throw new UnauthorizedException();
    }

    try {
      switch (auth_type) {
        case 'github':
          console.log('GITHUB');
          // const access_token = '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';
          const githubProfileURL = 'https://api.github.com/user';
          const headers = {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${access_token}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          };
          const response = await axios.get(githubProfileURL, headers);
          // console.log('::::::::: HERE IS THE RESOPONSE: ', response);
          const { login } = response?.data;
          username = login;

          break;
        case 'guest':
          console.log('GUEST');
          username = 'guest';

          break;
        default:
          const data = request.body;
          username = data?.username;
          console.log(':::::::::::::::>>>>>>>>>>> ', data);
          break;
      }
      const current_user = await this.prismaService.user_profile?.findUnique({
        where: { username: username.toLowerCase() },
      });
      if (!current_user) {
        throw new NotFoundException("Failed! Seems you don't have an account");
        //   const data = {
        //     tsid: generateTSID(),
        //     username: username.toLowerCase(),
        //     full_name,
        //   };
        //   current_user = await this.prismaService?.user_profile?.create({
        //     data: { ...data },
        //   });
        //   const { tsid: link_user } = current_user;
        //   await this.prismaService.user_role.create({
        //     data: {
        //       link_user,
        //       tsid: generateTSID(),
        //       role_type: 'Admin',
        //     },
        //   });
      }

      request['current_user'] = current_user;
    } catch (e) {
      console.log('::: ERROR: ', e?.response);
      // console.log(e, 'here is the error');

      throw e;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
