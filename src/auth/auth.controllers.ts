import { Controller,Post,Body, Get } from "@nestjs/common";
import {AuthService} from './auth.service';
import { Role } from "src/common/enum/role.enum";
@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}
    @Post('login')
    login(@
        Body()body:{email:string,password:string}){
        return this.authService.login(body.email,body.password);
    }
    @Post('register')
    register(@Body() body:{email:string;password:string;role?:Role}){
        return this.authService.register(body.email,body.password, body.role);
    }
    @Post('delete')
    delete(@Body() body:{email:string}){
        return this.authService.delete(body.email);
    }
    @Get('getAll')
    getAll() {
        return this.authService.getAll();
    }
   
}
