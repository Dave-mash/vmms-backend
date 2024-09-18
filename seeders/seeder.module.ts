// seeders/seeder.module.ts

import { Module } from '@nestjs/common';

import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SeederModule, PrismaService],
})
export class SeederModule {
  constructor(private readonly prisma: PrismaService) {}

  async seedAdminData(): Promise<void> {
    const data = {
      full_name: 'Guest',
      tsid: generateTSID(),
      username: 'guest',
    };
    let guest = await this.prisma.user_profile.findUnique({
      where: { username: 'guest' },
    });

    if (!guest) {
      guest = await this.prisma.user_profile.create({ data });
    }
    const { tsid: link_user } = guest;
    const role = await this.prisma.user_role.findUnique({
      where: { link_user },
    });
    if (!role) {
      await this.prisma.user_role.create({
        data: {
          link_user,
          tsid: generateTSID(),
          role_type: 'Guest',
        },
      });
    }
  }
}
