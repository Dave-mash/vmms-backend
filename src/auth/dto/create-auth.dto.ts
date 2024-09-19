import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  full_name: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  full_name: string;
  @IsString()
  phone: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateSubUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  full_name: string;
  @IsString()
  phone: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  role_type: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
