import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import configuration from "src/config/configuration";
import { JwtPayload } from "../types";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configuration.accessTokenSecret
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
