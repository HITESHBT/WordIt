import { IsNotEmpty } from "class-validator";
import { LikeBlogDTO } from "./likeBlog.dto";

export class CommentBlogDTO extends LikeBlogDTO{
    @IsNotEmpty()
    comment_data:string;
    access_key:string;
}