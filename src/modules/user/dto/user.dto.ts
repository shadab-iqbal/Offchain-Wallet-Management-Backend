import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";

export class UserDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEmpty()
  wallet_address: string;

  @IsEmpty()
  private_key: string;
}
