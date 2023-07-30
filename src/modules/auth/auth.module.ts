import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "@/modules/user/user.module";

@Module({
  imports: [JwtModule.register({}), PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
