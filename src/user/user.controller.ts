import { Controller, Get, Param, Post, Body, Query } from "@nestjs/common";
import { get } from "http";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private user_service:UserService){

    }
    @Post('signup')
    async signup(@Body() loginDTO:CreateUserDto){
        return  await this.user_service.signup(loginDTO);
    }
}