import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrganisationController } from './organisation.controller';
import { OrganisationRepository } from './organisation.repository';
import { OrganisationService } from './organisation.service';

@Module({
  controllers: [OrganisationController],
  providers: [OrganisationRepository, PrismaService, OrganisationService],
})
export class OrganisationModule {}
