import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  HttpCode,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserGuard } from './user.guard';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Post('login')
  async userLogin(@Request() req: any) {
    const current_user = req?.current_user;
    const newUser = await this.authService.userLogin(current_user);
    // response.cookie('vmms:session', 'your_token_value', {
    //   httpOnly: false, // Set to true if you want it to be HttpOnly
    //   secure: false, // Set to true in production if using HTTPS
    //   maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    //   path: '/', // Path for which the cookie is valid
    // });

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
