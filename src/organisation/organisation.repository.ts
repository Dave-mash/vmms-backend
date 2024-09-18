import { Injectable } from '@nestjs/common';
import { organisation } from '@prisma/client';
import { generateTSID } from 'packages/shared-packages/src/utils';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrganisationRepository {
  constructor(private app: PrismaService) {}

  async createOrganisation(data: any): Promise<organisation | null> {
    const organisation = await this.app?.organisation?.create({
      data: {
        ...data,
        tsid: generateTSID(),
      },
    });

    return organisation;
  }

  async updateOrganisation(
    tsid: string,
    updates: any,
  ): Promise<organisation | null> {
    const organisation = await this.app?.organisation?.update({
      where: { tsid },
      data: { ...updates },
    });

    return organisation;
  }

  async getOrganisationByName(name: string): Promise<organisation | null> {
    if (!name) return null;

    const organisation = await this.app?.organisation?.findFirst({
      where: { name },
    });

    return organisation;
  }
}
