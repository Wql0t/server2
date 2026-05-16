import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { UserService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:String("qwerty_12353434543534543534534435sdrfsdrese"),
        });
    }
    async validate(payload:any){
        return payload;
    }
    
}