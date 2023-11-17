import { Controller, Get, Param, Post, Body, Query, Delete } from "@nestjs/common";
import { get } from "http";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";
import { CreateUserProfileDto } from "./dto/createUserProfile.dto";
import { DeleteUserDto } from "./dto/deleteUser.dto";
import { CreateConnectionDto } from "./dto/createConnection.dto";
import { GetProfileDto } from "./dto/getProfile.dto";

@Controller('user')
export class UserController{
    constructor(private user_service:UserService){

    }
    @Post('signup')
    async signup(@Body() loginDTO:CreateUserDto){
        return  await this.user_service.signup(loginDTO);
    }
    @Post('login')
    async login(@Body() getIn:CreateUserDto){
        return await this.user_service.login(getIn);
    }
    @Post('create_profile')
    async createProfile(@Body() getP:CreateUserProfileDto){
        return await this.user_service.createUser(getP);
    }
    @Delete('delete')
    async deleteUser(@Query() del:DeleteUserDto){
        return await this.user_service.deleteUser(del);
    }
    @Post('follow')
    async createConnection(@Body() connect:CreateConnectionDto){
        return await this.user_service.createConnection(connect);
    }
    @Get('profile/:user_id')
    async getProfile(@Param("user_id") user_id:string){
        return await this.user_service.getProfile(user_id);
    }
    
}