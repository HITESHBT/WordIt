import { Controller, Get, Param, Post, Body, Query, Delete } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDTO } from "./dto/createBlog.dto";
import { DeleteBlogDTO } from "./dto/deleteBlog.dto";
import { UpdateBlogDTO } from "./dto/updateBlog.dto";
import { LikeBlogDTO } from "./dto/likeBlog.dto";
import { CommentBlogDTO } from "./dto/commentBlog.dto";
import { UpdateCommentDTO } from "./dto/updateComment.dto";

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
    @Post('update_blog')
    async blogUpdate(@Body() ub:UpdateBlogDTO)
    {
        return await this.blog_service.updateBlog(ub);
    }
    @Get('get_blog_byId/:blog_id')
    async getBlogById(@Param("blog_id") blog_id:string)
    {
        return await this.blog_service.getBlogById(blog_id);
    }
    @Get('get_blog_byUser/:user_id')
    async getBlogByUser(@Param("user_id") user_id:string)
    {
        return await this.blog_service.getBlogByUser(user_id);
    }
    @Post('like')
    async LikeBlog(@Query() lb:LikeBlogDTO){
        return await this.blog_service.likeBlog(lb)
    }
    @Delete('unlike')
    async UnlikeBLog(@Query() lb:LikeBlogDTO){
        return await this.blog_service.unlikeBlog(lb)
    }
    @Post('create_comment')
    async create_comment(@Body() cb:CommentBlogDTO){
        return await this.blog_service.comment_blog(cb)
    }
    @Post('update_comment')
    async update_comment(@Body() ub:UpdateCommentDTO){
        return await this.blog_service.comment_update(ub)
    }
    @Get('get_comment/:blog_id')
    async get_comment(@Param('blog_id') blog_id:string)
    {
        return await this.blog_service.getCommentbyBlogId(blog_id)
    }
    @Delete('delete_comment')
    async delete_comment(@Query("comment_id") comment_id:string)
    {
        return await this.blog_service.deleteComment(comment_id)
    }
}



    