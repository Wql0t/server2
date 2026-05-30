import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
  async hasAdmin(): Promise<boolean> {
    const count = await this.repo.count({ where: { role: Role.ADMIN } });
    return count > 0;
  }
  async remove(email: string): Promise<void> {
        await this.repo.delete({ email });
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