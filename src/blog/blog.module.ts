import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./entity/blog.entity";
import { BlogDetailed } from "./entity/blogDetail.entity";
import { Comment } from "./entity/comment.entity";
import { Like } from "./entity/likes.entity";
import { Media } from "src/common_entities/media.entity";
import { MediaType } from "src/common_entities/mediaType.entity";

@Module(
    {
        providers:[BlogService],
        controllers:[BlogController],
        imports:[TypeOrmModule.forFeature([Blog,BlogDetailed,Comment,Like,Media,MediaType])]
    }
)
export class BlogModule{}