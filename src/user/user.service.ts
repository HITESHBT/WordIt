import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Credential } from "./entity/credential.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(@InjectRepository(Credential) private credentialRepository:Repository<Credential>){

    }
    async signup(userSU:CreateUserDto){

        const user=await this.credentialRepository.findOne({"where":{email:userSU.email}});
        if(user){
            if(user.password===userSU.password)
            {
                throw new HttpException('Go to login page',HttpStatus.BAD_GATEWAY);
            }
            throw new HttpException('user with same email-id already exits',HttpStatus.BAD_REQUEST)
        }
        const newUser= new Credential({'email':userSU.email,'password':userSU.password});
        
        return await this.credentialRepository.save(newUser);
        }
    }
