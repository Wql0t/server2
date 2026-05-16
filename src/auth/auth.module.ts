import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
import { AuthService} from './auth.service';
import { AuthController } from './auth.controllers';
import {JwtStrategy} from './jwt.strategy'
import { UserModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: "qwerty_12353434543534543534534435sdrfsdrese",
            signOptions:{
                expiresIn: 200000}
        })
    ] ,
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy]
})
export class AuthModule{}