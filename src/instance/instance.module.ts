import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VMInstanceController } from './instance.controller';
import { VMInstanceService } from './instance.service';
import { VMInstanceRepository } from './instance.repository';

@Module({
  controllers: [VMInstanceController],
  providers: [VMInstanceRepository, PrismaService, VMInstanceService],
})
export class VMInstanceModule {}
