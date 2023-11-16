import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Credential } from "./entity/credential.entity";
import { Repository } from "typeorm";
import { user } from "./entity/user.entity";
import { CreateUserProfileDto } from "./dto/createUserProfile.dto";
import { Profile } from "./entity/profile.entity";
import { MediaType } from "src/common_entities/mediaType.entity";
import { Media } from "src/common_entities/media.entity";
import { DeleteUserDto } from "./dto/deleteUser.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(Credential) private credentialRepository: Repository<Credential>,
        @InjectRepository(user) private userRepo: Repository<user>,
        @InjectRepository(MediaType) private mtypeRepo: Repository<MediaType>,
        @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    ) {

    }
    async signup(userSU: CreateUserDto) {

        const user = await this.credentialRepository.findOne({ "where": { email: userSU.email } });
        if (user) {
            if (user.password === userSU.password) {
                throw new HttpException('Go to login page', HttpStatus.BAD_GATEWAY);
            }
            throw new HttpException('user with same email-id already exits', HttpStatus.BAD_REQUEST)
        }
        const newUser = new Credential({ 'email': userSU.email, 'password': userSU.password });

        return await this.credentialRepository.save(newUser);
    }
    async login(userLI: CreateUserDto) {
        const user = await this.credentialRepository.findOne({ "where": { email: userLI.email } })
        if (user === null) {
            throw new HttpException('Go to sign-up page', HttpStatus.BAD_GATEWAY);
        }
        if (user.password === userLI.password) {
            return user;
        }
        else {
            throw new HttpException('Incorrect credentials', HttpStatus.FORBIDDEN);
        }
    }
    async createUser(userPC: CreateUserProfileDto) {
        const use = await this.credentialRepository.findOne({ "where": { user_id: userPC.user_id, access_key: userPC.access_key } })
        if (use === null) {
            throw new HttpException('Invalid user', HttpStatus.FORBIDDEN);
        }
        const newProfile = new Profile({ 'user_id': userPC.user_id, 'description': userPC.description, "users": new user({ "user_id": userPC.user_id, "user_name": userPC.user_name, "media_one": new Media({ 'image_url': userPC.image_url, 'media_type':'profile',"user_id":userPC.user_id }) }) });
        return await this.profileRepo.save(newProfile);

    }
    async deleteUser(userD:DeleteUserDto)
    {
        const obj= await this.credentialRepository.findOne({"where":{user_id:userD.user_id,access_key:userD.access_key}});
        if(obj===null)
        {
            throw new HttpException('Inavlid credentials',HttpStatus.FORBIDDEN);
        }
        await this.credentialRepository.remove(obj);
        return "deleted successfully";
    }


}
