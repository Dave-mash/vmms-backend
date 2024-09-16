import { IsNotEmpty, IsString } from 'class-validator';

export class MakePaymentDto {
  @IsString()
  @IsNotEmpty()
  transaction_ref_no: string;
  @IsString()
  @IsNotEmpty()
  payment_mode: string;
  @IsString()
  @IsNotEmpty()
  amount: string;
  @IsString()
  @IsNotEmpty()
  account_no: string;
  @IsString()
  @IsNotEmpty()
  tranCCY: string;
}
