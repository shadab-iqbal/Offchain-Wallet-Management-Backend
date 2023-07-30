import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { JwtGuard, RefreshJwtGuard } from "@/common/guard";
import { AuthService } from "@/modules/auth/auth.service";
import { AuthDto } from "@/modules/auth/dto/auth.dto";
import { RefreshToken } from "@/modules/auth/interfaces";
import { Body, Controller, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "../user/user.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signup")
  signup(@Body() body) {
    return this.userService.createOne(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post("export-private-key")
  exportPrivateKey(@Body() dto, @CurrentUser() user) {
    return this.authService.exportPrivateKey({
      password: dto.password,
      user_id: user.user_id,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post("refresh-token")
  @UseGuards(RefreshJwtGuard)
  refreshToken(@Req() req: Request & { user: RefreshToken }) {
    return this.authService.refreshToken(req.user);
  }
}
