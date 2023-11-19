import { Controller, Get, Param, Post, Body, Query, Delete } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDTO } from "./dto/createBlog.dto";
import { DeleteBlogDTO } from "./dto/deleteBlog.dto";

@Controller('blogs')
export class BlogController{
    constructor(private blog_service:BlogService){

    }
    @Post('create_blog')
    async createBlog(@Body() cb:CreateBlogDTO){
        return await this.blog_service.createBlog(cb);
    }
    @Delete('delete_blog')
    async deleteBlog(@Query() delB:DeleteBlogDTO)
    {
        return await this.blog_service.deleteBlog(delB);
    }
}

    