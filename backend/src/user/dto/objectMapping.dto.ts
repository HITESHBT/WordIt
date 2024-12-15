import {IsOptional} from "class-validator";
export class Child2{
    @IsOptional()
    image_url:string;
}
export class Child1{
    @IsOptional()
    user_name?:string;
    @IsOptional()
    media_one?:Child2;
}
export class ObjectMappingDTO{
    user_id:string;
    @IsOptional()
    description?:string;
    @IsOptional()
    users?:Child1;
}

