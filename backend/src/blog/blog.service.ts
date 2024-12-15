import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogDetailed } from "./entity/blogDetail.entity";
import { Repository } from "typeorm";
import { Blog } from "./entity/blog.entity";
import { MediaType } from "src/common_entities/mediaType.entity";
import { CreateBlogDTO } from "./dto/createBlog.dto";
import { Media } from "src/common_entities/media.entity";
import { Credential } from "src/user/entity/credential.entity";
import { DeleteBlogDTO } from "./dto/deleteBlog.dto";
import { UpdateBlogDTO } from "./dto/updateBlog.dto";
import { LikeBlogDTO } from "./dto/likeBlog.dto";
import { Like } from "./entity/likes.entity";
import { CommentBlogDTO } from "./dto/commentBlog.dto";
import { Comment } from "./entity/comment.entity";
import { UpdateCommentDTO } from "./dto/updateComment.dto";
import { Http2ServerRequest } from "http2";

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogDetailed) private blogDetailRepository: Repository<BlogDetailed>,
        @InjectRepository(Blog) private blogRepository: Repository<Blog>, @InjectRepository(MediaType) private mtypeRepo: Repository<MediaType>,
        @InjectRepository(Credential) private credentialRepository: Repository<Credential>,
        @InjectRepository(Like) private likeRepository: Repository<Like>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
    ) {
    }
    async createBlog(Cblog: CreateBlogDTO) {
        const user= await this.credentialRepository.findOne({"where":{
            user_id:Cblog.user_id,access_key:Cblog.access_key
        }})
        if(user===null)
        {
            throw new HttpException('Invalid user',HttpStatus.FORBIDDEN)
        }
        const blog = new BlogDetailed({ 'blog_content': Cblog.blog_content, 'medias': new Media({ 'image_url': Cblog.image_url, 'media_type': 'blog' }), 'blogs': new Blog({ 'blog_title': Cblog.blog_title, 'user_id': Cblog.user_id})});
        return await this.blogDetailRepository.save(blog);
    }
    async deleteBlog(delB:DeleteBlogDTO)
    {
        const user= await this.credentialRepository.findOne({"where":{
            user_id:delB.user_id,access_key:delB.access_key
        }})
        if(user===null)
        {
            throw new HttpException('Invalid user',HttpStatus.FORBIDDEN)
        }
        let b=await this.blogRepository.findOne({"where":{
            blog_id:delB.blog_id,user_id:delB.user_id
        }});
        if(b===null)
        {
            throw new HttpException('Invalid request',HttpStatus.FORBIDDEN)
        }
        else{
            const bg=await this.blogDetailRepository.findOne({"where":{
                blog_id:delB.blog_id
            }})
            await this.blogDetailRepository.remove(bg);
            return 'deleted successfully'
        }
    }
    async updateBlog(upblg:UpdateBlogDTO)
    {
        const user= await this.credentialRepository.findOne({"where":{
            user_id:upblg.user_id,access_key:upblg.access_key
        }})
        if(user===null)
        {
            throw new HttpException('Invalid user',HttpStatus.FORBIDDEN)
        }
        const blg=await this.blogDetailRepository.findOne({"where":{blog_id:upblg.blog_id},relations:["medias","blogs"]})
        if(blg===null)
        {
            throw new HttpException("Blog does'nt exist",HttpStatus.NOT_FOUND);
        }
        if(upblg.blog_content!==""){
        blg.blog_content=upblg.blog_content;}
        if(upblg.blog_title!==""){
        blg.blogs.blog_title=upblg.blog_title;}
        if(upblg.image_url!==""){
        blg.medias.image_url=upblg.image_url;}
        return await this.blogDetailRepository.save(blg);
    }
    async getBlogById(blog_id:string)
    {
        const blg=await this.blogDetailRepository.findOne({"where":{
            blog_id:blog_id
        },relations:["medias","blogs"]})
        if(blg===null)
        {
            throw new HttpException("Blog does'nt exist",HttpStatus.NOT_FOUND);
        }
        return blg;
    }
    async getBlogByUser(user_id:string)
    {
        const blg=await this.blogRepository.find({"where":{
            user_id:user_id
        },relations:["blog_detail"]})
        if(blg===null)
        {
            throw new HttpException("No blog's by user",HttpStatus.NOT_FOUND);
        }
        return blg;
    }
    async likeBlog(lb:LikeBlogDTO){
        const findLike=await this.likeRepository.findOne({"where":{
            user_id:lb.user_id,blog_id:lb.blog_id
        }})
        if(findLike!==null)
        {
            throw new HttpException('Already Liked by you',HttpStatus.BAD_REQUEST);
        }
        console.log(lb)
        const fb=await this.blogRepository.findOne({"where":{
            blog_id:lb.blog_id
        }})
        const like=new Like({'user_id':lb.user_id,'blog_id':lb.blog_id})
        return this.likeRepository.save(like);
    }
    async unlikeBlog(lb:LikeBlogDTO)
    {
        const findLike=await this.likeRepository.findOne({"where":{
            user_id:lb.user_id,blog_id:lb.blog_id
        }})
        if(findLike===null)
        {
            throw new HttpException('No likes from you on this one',HttpStatus.BAD_REQUEST);
        }
        await this.likeRepository.remove(findLike);
        return 'you unliked the post'
    }
    async comment_blog(cb:CommentBlogDTO){
        const user= await this.credentialRepository.findOne({"where":{
            user_id:cb.user_id,access_key:cb.access_key
        }})
        if(user===null)
        {
            throw new HttpException('Invalid user',HttpStatus.FORBIDDEN)
        }
        const comment=new Comment({'blog_id':cb.blog_id,'comment_data':cb.comment_data,'user_id':cb.user_id})
        return await this.commentRepository.save(comment);
    }
    async comment_update(cu:UpdateCommentDTO){
        const user= await this.credentialRepository.findOne({"where":{
            user_id:cu.user_id,access_key:cu.access_key
        }})
        if(user===null)
        {
            throw new HttpException('Invalid user',HttpStatus.FORBIDDEN)
        }
        const blg=await this.commentRepository.findOne({"where":{
            comment_id:cu.comment_id
        }})
        if(blg===null)
        {
            throw new HttpException("comment not found",HttpStatus.NOT_FOUND)
        }
        blg.comment_data=cu.comment_data;
        return await this.commentRepository.save(blg);
    }
    async getCommentbyBlogId(blog_id:string)
    {
        const comm=await this.commentRepository.find({"where":{
            blog_id:blog_id
        }})
        return comm;
    }
    async deleteComment(comment_id:string)
    {
        const comm=await this.commentRepository.findOne({"where":{
            comment_id:comment_id
        }})
        await this.commentRepository.remove(comm)
        return 'comment deleted'
    }
}