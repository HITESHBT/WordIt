import { UsersCredsDto } from "src/common_dto/user_creds.dto";

export class CreateUserProfileDto extends UsersCredsDto{
    user_name:string;
    description:string;
    image_url:string;
}