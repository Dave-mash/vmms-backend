import {
  ConflictException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { OrganisationRepository } from './organisation.repository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrganisationService {
  constructor(
    private organisationRepository: OrganisationRepository,
    private prismaService: PrismaService,
  ) {}

  @Post()
  async createOrganisation(current_user: any, orgPayload: any) {
    try {
      const { name, subscriptionPayload } = orgPayload;
      const existingOrganisation =
        await this.organisationRepository.getOrganisationByName(
          name.toLowerCase(),
        );
      if (existingOrganisation) {
        throw new ConflictException(
          'Please choose a different organisation name.',
        );
      }
      orgPayload['name'] = orgPayload?.name?.toLowerCase();
      const newOrganisation =
        await this.organisationRepository.createOrganisation(orgPayload);
      if (newOrganisation) {
        const { tsid: userID } = current_user;
        const updates = {
          link_organisation: newOrganisation?.tsid,
        };
        await this.prismaService.user_role.update({
          where: { link_user: userID },
          data: { ...updates },
        });
      }

      return {
        msg: 'Success',
        newOrganisation,
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw e;
    }
  }

  async deleteInstance() {
    try {
      // Shedule background process

      return {
        msg: 'Success',
      };
    } catch (e) {
      console.log(':::::::::: ', e);
      throw new NotFoundException('Resource not found!');
    }
  }
}
