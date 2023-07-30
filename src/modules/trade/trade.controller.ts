import { Controller, Get, Post, Put, Patch, Body, UseGuards, Param } from "@nestjs/common";
import { JwtGuard } from "@/common/guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

import { TradeService } from "./trade.service";

@Controller("trade")
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @UseGuards(JwtGuard)
  @Post("buy")
  buyTokens(@Body() body, @CurrentUser() user?: any) {
    return this.tradeService.buyTokens(body, user.user_id);
  }

  @UseGuards(JwtGuard)
  @Post("sell")
  sellTokens(@Body() body, @CurrentUser() user?: any) {
    return this.tradeService.sellTokens(body, user.user_id);
    // return user;
  }

  @UseGuards(JwtGuard)
  @Post("withdraw")
  withdrawTokens(@Body() body, @CurrentUser() user?: any) {
    // return body;
    return this.tradeService.withdrawTokens(body, user.user_id);
  }

  // @Get("coingecko-price/:id")
  // getCoingeckoPrice(@Param("id") id: string) {
  //   return this.tradeService.getCoingeckoPrice([id]);
  // }

  // @Get("cost")
  // getTransactionCost() {
  //   return this.tradeService.getTransactionCost();
  // }
}
