import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from './dto/make-payment';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('callback')
  //   @Roles(Role.Admin)
  async makePayment(@Body() subscriptionPayload: MakePaymentDto) {
    const newSubscription =
      await this.paymentService.createPayment(subscriptionPayload);

    return newSubscription;
  }
}
