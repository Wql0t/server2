import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestJS/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Role } from "src/common/enum/role.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly repo:Repository<User>,
    ){}
  
   async findByEmail(email:string){
        return this.repo.findOne({where:{email}});
    }
  async findById(id:number){
    return this.repo.findOne({where:{id}})
  }
  async findAll() {
    return this.repo.find()
  }
 async create(dto:CreateUserDto){
    const hashedPassword=await bcrypt.hash(dto.password,10);
    const user = this.repo.create({
      email:dto.email,
      password:hashedPassword,
      role:dto.role
    });
    return this.repo.save(user);
  }
}