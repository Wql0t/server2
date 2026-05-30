import { Injectable,UnauthorizedException } from "@nestjs/common";
import {UserService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { access } from "fs";
import { Role } from "src/common/enum/role.enum";
import { isValidDate } from "rxjs/internal/util/isDate";

@Injectable()
export class AuthService{
    constructor(
        private readonly usersService:UserService,
        private readonly jwtService:JwtService
    ){}
    async register(email:string,password:string){
        return this.usersService.create({
            email,
            password,
            role: Role.USER
        });
    }
    async login(email:string,password:string){
        const user=await this.usersService.findByEmail(email);
        if(!user) throw new UnauthorizedException();
        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid) throw new UnauthorizedException();
        const payload={
            sub:user.id,
            email:user.email,
            role:user.role
        };
        return{
            access_token:this.jwtService.sign(payload),
        };
    }
    
    async delete(email:string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Пользователь с таким email не найден');
        }
        await this.usersService.remove(email);


        return { message: `Пользователь с email ${email} успешно удален` };
    }
    async getAll() {
        const users = await this.usersService.findAll();
        return { status: users };
    }
}