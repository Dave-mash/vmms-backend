import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VMInstanceService } from './instance.service';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vm/instance')
export class VMInstanceController {
  constructor(private readonly instanceService: VMInstanceService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('create')
  @Roles(Role.Admin)
  async createNewVM(@Body() createInstancePayload: any, @Request() req: any) {
    const current_user = req?.current_user;
    const newUser = await this.instanceService.createInstance(
      current_user,
      createInstancePayload,
    );

    return newUser;
  }
}
