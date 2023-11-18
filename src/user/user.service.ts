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
import { Connections } from "./entity/connections.entity";
import { CreateConnectionDto } from "./dto/createConnection.dto";
import { GetProfileDto } from "./dto/getProfile.dto";
import {instanceToPlain} from "class-transformer";
import { ObjectMappingDTO } from "./dto/objectMapping.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(Credential) private credentialRepository: Repository<Credential>,
        @InjectRepository(user) private userRepo: Repository<user>,
        @InjectRepository(MediaType) private mtypeRepo: Repository<MediaType>,
        @InjectRepository(Profile) private profileRepo: Repository<Profile>,
        @InjectRepository(Connections) private connectionsRepo: Repository<Connections>,
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

            return instanceToPlain(user);
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
    async createConnection(connect:CreateConnectionDto){
        const user1=await this.credentialRepository.findOne({"where":{
            user_id:connect.followed_by_id,access_key:connect.followed_by_access_id
        }});
        const user2=await this.credentialRepository.findOne({"where":{
            user_id:connect.followed_to_id
        }});
        if(user1===null||user2===null)
        {
            throw new HttpException('Invalid request',HttpStatus.BAD_REQUEST);
        }
        const findConnection=await this.connectionsRepo.findOne({"where":{
            followedby_id:connect.followed_by_id,followedto_id:connect.followed_to_id
        }});
        if(findConnection===null)
        {
            const temp=new Connections({'followedby_id':connect.followed_by_id,'followedto_id':connect.followed_to_id});
            await this.updateFollow(connect.followed_by_id,connect.followed_to_id,true);
            await this.connectionsRepo.save(temp);
            return 'follow successfull';
        }
        else
        {
            await this.connectionsRepo.delete(findConnection);
            await this.updateFollow(connect.followed_by_id,connect.followed_to_id,false);
            return 'unfollow successful';
        }
        
    }
    async updateFollow(followed_by_id:string,followed_to_id:string,flag:boolean)
    {
        const fbyP=await this.profileRepo.findOne({"where":{
            user_id:followed_by_id
        }})
        const ftoP=await this.profileRepo.findOne({"where":{
            user_id:followed_to_id
        }})
        if(flag)
        {
            fbyP.following_no+=1;
            ftoP.follower_no+=1;
        }
        else
        {
            fbyP.following_no-=1;
            ftoP.follower_no-=1;
        }
        await this.profileRepo.save(fbyP);
        await this.profileRepo.save(ftoP);
    }
    async getProfile(obj:string){
        const profile1=await this.profileRepo.findOne({"where":{
            user_id:obj
        },relations:["users"]})
        return profile1;
    }
    async getFollow(user_id:string)
    {
        const ar=await this.connectionsRepo.find({'where':{followedto_id:user_id}})
        return ar;
    }
    async getFollowing(user_id:string)
    {
        const ar=await this.connectionsRepo.find({'where':{followedby_id:user_id}})
        return ar;
    }
    async updateProfile(userUP:CreateUserProfileDto)
    {
        const user=await this.profileRepo.findOne({"where":{
            user_id:userUP.user_id 
        },relations:["users"]})
        // Object.assign(user,{"description":userUP.description})
        if(userUP.description!=="")
        user.description=userUP.description;
        if(userUP.image_url!=="")
        user.users.media_one.image_url=userUP.image_url;
        if(userUP.user_name!==undefined)
        user.users.user_name=userUP.user_name;
        return await this.profileRepo.save(user);
    }
}
