import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    const newUser = await this.authService.createUser(createAuthDto);

    return newUser;
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    const current_user = req?.current_user;
    console.log('Here we go...', current_user);
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    // updateAuthDto: UpdateAuthDto
    return this.authService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
