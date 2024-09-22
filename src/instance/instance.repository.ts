import { Injectable } from '@nestjs/common';
import { instance } from '@prisma/client';
import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VMInstanceRepository {
  constructor(private app: PrismaService) {}

  async createInstance(data: any): Promise<instance | null> {
    const instance = await this.app?.instance?.create({
      data: {
        ...data,
        tsid: generateTSID(),
      },
    });

    return instance;
  }

  async updateInstance(vm_id: string, updates: any): Promise<instance | null> {
    const instance = await this.app?.instance?.update({
      where: { vm_id },
      data: { ...updates },
    });

    return instance;
  }

  async getInstanceByName(name: string): Promise<instance | null> {
    if (!name) return null;

    const instance = await this.app?.instance?.findFirst({
      where: { name },
    });

    return instance;
  }

  async getInstanceByOrganisation(
    link_organisation: string,
  ): Promise<instance[] | null> {
    const instances = await this.app?.instance?.findMany({
      where: { link_organisation },
    });

    return instances;
  }
}
