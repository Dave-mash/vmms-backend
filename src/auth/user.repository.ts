import { Injectable } from '@nestjs/common';
import { user_profile } from '@prisma/client';
import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private app: PrismaService) {}

  async createUser(
    data: any,
    role_type = 'Admin',
    link_organisation = '',
  ): Promise<user_profile | null> {
    const user = await this.app?.user_profile?.create({
      data: { ...data },
    });
    if (!!user) {
      const { tsid: link_user } = user;
      await this.app.user_role.create({
        data: {
          link_user,
          tsid: generateTSID(),
          role_type,
          link_organisation,
        },
      });
    }

    return user;
  }

  async updateUser(
    username: string,
    updates: any,
  ): Promise<user_profile | null> {
    const user = await this.app?.user_profile?.update({
      where: { username },
      data: { ...updates },
    });

    return user;
  }

  async getUserByUsername(username: string): Promise<user_profile | null> {
    const user = await this.app?.user_profile?.findUnique({
      where: { username },
    });

    return user;
  }

  async getUserByUsernameOrPhone(
    phone: string,
    username: string,
  ): Promise<user_profile | null> {
    if (!phone || !username) {
      return null;
    }
    const user = await this.app.user_profile.findFirst({
      where: {
        OR: [{ phone }, { username }],
      },
    });

    return user;
  }
}
