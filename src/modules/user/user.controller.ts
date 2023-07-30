import { Controller, Get, Post, Put, Patch, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "@/common/guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get("token-balance")
  async getUserTokenBalance(@CurrentUser() user?: any) {
    const userTokenBalance = await this.userService.getUserTokenBalance(user.user_id);
    return userTokenBalance;
  }
}
