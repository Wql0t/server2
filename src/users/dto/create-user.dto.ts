import {Role} from '../../common/enum/role.enum'
export class CreateUserDto{
    email:string;
    password:string;
    role?:Role;
}