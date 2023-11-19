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

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogDetailed) private blogDetailRepository: Repository<BlogDetailed>,
        @InjectRepository(Blog) private blogRepository: Repository<Blog>, @InjectRepository(MediaType) private mtypeRepo: Repository<MediaType>,
        @InjectRepository(Credential) private credentialRepository: Repository<Credential>
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
        const blog = new BlogDetailed({ 'blog_content': Cblog.blog_content, 'medias': new Media({ 'image_url': Cblog.image_url, 'media_type': 'blog' }), 'blogs': new Blog({ 'blog_title': Cblog.blog_title, 'user_id': Cblog.user_id }) });
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
}