import { Module } from "@nestjs/common";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transactions } from "./entities/transactions.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Transactions]), UserModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
