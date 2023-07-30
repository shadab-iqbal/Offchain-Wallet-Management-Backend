import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "@/modules/auth/interfaces";
import * as argon from "argon2";

import { User } from "@/modules/user/entities/user.entity";
import { UserService } from "@/modules/user/user.service";
import { UserDto } from "@/modules/user/dto/user.dto";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  /**
   * Authenticates a user and generates access and refresh tokens.
   *
   * @param {AuthDto} dto - The authentication DTO containing email and password.
   * @returns {Promise<Object>} - An object containing access token, refresh token, and expiration time.
   * @throws {Error} - If the user is not found or the password is incorrect.
   */
  async signIn(dto: AuthDto) {
    try {
      const user = await this.userService.getUserByEmail(dto.email);
      await this.validateUser(user, dto.password);
      const { access_token, refresh_token, expires_in } = await this.signTokens(user);
      return {
        access_token,
        refresh_token,
        expires_in,
      };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Authenticates a user and exports their private key.
   *
   * @param {any} dto - The authentication DTO containing password.
   * @returns {Promise<Object>} - An object containing exported private key.
   * @throws {Error} - If the password is incorrect.
   */
  async exportPrivateKey(dto) {
    try {
      const user = await this.userService.getUserById(dto.user_id);
      await this.validateUser(user, dto.password);
      return this.userService.getPrivateKeyById(dto.user_id, dto.password);
    } catch (e) {
      throw e;
    }
  }

  async refreshToken(dto: RefreshToken) {
    const user = await this.userService.getUserById(parseInt(dto.user_id.toString()));
    if (!user) throw new ForbiddenException();
    const { access_token, refresh_token, expires_in } = await this.signTokens(user);
    return {
      access_token,
      refresh_token,
      expires_in,
    };
  }

  async signTokens(user: User): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }> {
    const expires_in = Date.now() + 365 * 24 * 60 * 60;
    //define payloads
    const accessPayload = {
      user_id: user.id,
      email: user.email,
    };
    const refreshPayload = {
      user_id: user.id,
    };
    const bearerSecret = this.config.get("JWT_BEARER_SECRET");
    const refreshSecret = this.config.get("JWT_REFRESH_SECRET");

    //generate a bearer token
    const accessToken = await this.jwt.signAsync(accessPayload, {
      expiresIn: "30d",
      secret: bearerSecret,
    });

    //generate a refresh token
    const refreshToken = await this.jwt.signAsync(refreshPayload, {
      expiresIn: "60d",
      secret: refreshSecret,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in,
    };
  }

  async validateUser(user: UserDto, password: string) {
    // compare password
    const passwordMatches = await argon.verify(user.password, password);
    // if password incorrect throw exception
    if (!passwordMatches) throw new UnauthorizedException("Incorrect Credentials");
    return true;
  }
}
