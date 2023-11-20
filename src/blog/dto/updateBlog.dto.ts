import { CreateBlogDTO } from "./createBlog.dto";

export class UpdateBlogDTO extends CreateBlogDTO{
    blog_id:string;
}