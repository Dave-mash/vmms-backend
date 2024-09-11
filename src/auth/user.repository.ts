import { Injectable } from '@nestjs/common';
import { user_profile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private app: PrismaService) {}

  async createUser(data: any): Promise<user_profile | null> {
    const user = await this.app?.user_profile?.create({
      data: { ...data },
    });

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
}
