import { appConfig } from "@/config";
import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { decode, verify } from "jsonwebtoken";
import { Observable } from "rxjs";
// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config();

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    // console.log("printing bearer token... ", bearerToken);
    try {
      const bearerToken = context.switchToHttp().getRequest().headers.authorization;

      const token = bearerToken.split("Bearer ")[1];
      console.log("token ", token);
      const decoded = decode(token);
      const verified = verify(token, process.env.JWT_BEARER_SECRET);

      console.log("decoded token ", decoded);
      console.log("verified token ", verified);

      context.switchToHttp().getRequest().user = decoded;

      return true;
    } catch (ex) {
      console.log(ex);
      throw new UnauthorizedException("You are not authenticated");
    }
  }
}
