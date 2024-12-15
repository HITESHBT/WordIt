import { IsNotEmpty } from "class-validator";
import { CommentBlogDTO } from "./commentBlog.dto";

export class UpdateCommentDTO extends CommentBlogDTO{
    @IsNotEmpty()
    comment_id:string;
}