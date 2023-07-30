import { IsNotEmpty, IsOptional } from "class-validator";

export class TradeDto {
  @IsNotEmpty()
  amount: string;

  @IsOptional()
  recipientAddress: string;
}
