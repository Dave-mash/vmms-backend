import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { VMInstanceService } from './instance.service';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('vm/instance')
export class VMInstanceController {
  constructor(private readonly instanceService: VMInstanceService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @Roles(Role.Admin)
  async createNewVM(@Body() createInstancePayload: any) {
    const newUser = await this.instanceService.createInstance(
      createInstancePayload,
    );

    return newUser;
  }
}
