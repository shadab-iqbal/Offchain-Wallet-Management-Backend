import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TradeModule } from "./modules/trade/trade.module";
import { BullModule } from "@nestjs/bull";
import { TransactionsModule } from "./modules/transactions/transactions.module";

@Module({
  imports: [
    UserModule,
    PostgresDatabaseProviderModule,
    AuthModule,
    TradeModule,
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
