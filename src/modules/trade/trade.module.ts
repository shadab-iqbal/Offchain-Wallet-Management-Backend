import { Module } from "@nestjs/common";
import { TradeService } from "./trade.service";
import { TradeController } from "./trade.controller";
import { TradeConsumer } from "./TradeConsumer";
import { BullModule } from "@nestjs/bull";
import { UserModule } from "../user/user.module";
import { TransactionsModule } from "../transactions/transactions.module";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "trade",
    }),
    UserModule,
    TransactionsModule,
  ],
  controllers: [TradeController],
  providers: [TradeService, TradeConsumer],
})
export class TradeModule {}
