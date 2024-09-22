import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
// import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';
import { githubLogin } from 'src/utils/auth';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('HERE WE GO...', request.headers['auth-type']);
    const authType = request.headers['auth-type'];
    const accessToken = this.extractTokenFromHeader(request);
    let username;

    if (!accessToken && !authType) {
      throw new UnauthorizedException();
    }

    try {
      switch (authType) {
        case 'github':
          console.log('GITHUB');
          const response: { data: { login: string } } | any =
            await githubLogin(accessToken);
          const { login } = response?.data;
          username = login;

          break;
        case 'guest':
          console.log('GUEST');
          username = accessToken.toLowerCase();

          break;
        case 'form':
          const data = request.body;
          username = data?.username ?? '';
          console.log(':::::::::::::::>>>>>>>>>>> ', data);
          break;
      }
      const current_user = await this.prismaService.user_profile?.findUnique({
        where: { username: username.toLowerCase() },
      });
      if (!current_user) {
        console.log(':::::::CURRENT_USER>', username);
        throw new NotFoundException("Failed! Seems you don't have an account");
      }

      current_user['authType'] = authType;
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
