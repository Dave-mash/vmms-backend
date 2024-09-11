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
      username: 'Guest',
    };
    let guest = await this.prisma.user_profile.findUnique({
      where: { username: 'Guest' },
    });

    if (!guest) {
      guest = await this.prisma.user_profile.create({ data });
    }
  }
}
