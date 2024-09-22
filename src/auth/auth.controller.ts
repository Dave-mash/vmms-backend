import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Request,
  UsePipes,
  HttpStatus,
  HttpCode,
  UseGuards,
  Body,
  ValidationPipe,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserGuard } from './user.guard';
import {
  CreateSubUserDto,
  CreateUserDto,
  LoginUserDto,
} from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Post('login')
  async userLogin(@Request() req: any, @Body() body: LoginUserDto | any) {
    const currentUser = req?.current_user;
    const newUser = await this.authService.userLogin(currentUser, body);

    return newUser;
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('user/create')
  async userRegistration(
    @Body() body: CreateUserDto,
    @Headers('sso-token') authToken: string,
  ) {
    const newUser = await this.authService.registerUser(body, authToken);

    return newUser;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('sub-user/create')
  async subUserRegistration(
    @Body() body: CreateSubUserDto,
    @Request() req: any,
  ) {
    const current_user = req?.current_user;
    const newUser = await this.authService.registerSubUser(current_user, body);

    return newUser;
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    const current_user = req?.current_user;
    console.log('Here we go...', current_user);
    return current_user;
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
