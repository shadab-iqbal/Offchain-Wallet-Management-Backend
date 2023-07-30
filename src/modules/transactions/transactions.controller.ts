import { Controller, Get, UseGuards } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { JwtGuard } from "@/common/guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { UserService } from "../user/user.service";

@Controller("transactions")
export class TransactionsController {
  constructor(private transactionsService: TransactionsService, private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getUserTransactions(@CurrentUser() user?: any) {
    const userTransactions = await this.transactionsService.getUserTransactions(user.user_id);
    const userTokenBalance = await this.userService.getUserTokenBalance(user.user_id);
    // const userPrivateKey = await this.userService.getPrivateKeyById(user.user_id);
    return { userTransactions, userTokenBalance };
  }
}
