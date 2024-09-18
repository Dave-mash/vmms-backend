import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { OrganisationService } from './organisation.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrgDto } from './dto/create-org.dto';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  @Roles(Role.Admin)
  async createNewOrganisation(
    @Body() createInstancePayload: CreateOrgDto,
    @Request() req: any,
  ) {
    const currentUser = req?.current_user;
    const {
      role: { role_type },
    } = currentUser;
    const validRoles = ['Admin'];
    if (!validRoles.includes(role_type)) {
      throw new BadRequestException('Authorization failure!');
    }
    const newOrg = await this.organisationService.createOrganisation(
      currentUser,
      createInstancePayload,
    );

    return newOrg;
  }
}
