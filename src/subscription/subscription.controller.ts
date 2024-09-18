import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
// import { Role } from 'src/auth/role.enum';
// import { Roles } from 'src/auth/roles.decorator';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  //   @Roles(Role.Admin)
  async createSubscription(
    @Body() subscriptionPayload: CreateSubscriptionDto,
    @Request() req: any,
  ) {
    const current_user = req?.current_user;
    const { organisation } = current_user;
    console.log('::::::::: ', current_user);
    const newSubscription = await this.subscriptionService.createSubscription(
      organisation?.tsid,
      subscriptionPayload,
    );

    return newSubscription;
  }
}
