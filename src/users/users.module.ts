import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./user.entity";
import { AdminSeedService } from "./admin.seed";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UserService, AdminSeedService],
    controllers:[UsersController],
    exports:[UserService]
})
export class UserModule{}