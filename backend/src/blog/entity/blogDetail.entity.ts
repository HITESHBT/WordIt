import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";
import { Comment } from "./comment.entity";
import { Like } from "./likes.entity";
import { Media } from "src/common_entities/media.entity";
import { Tag } from "./tag.entity";
import { AbstractEntity } from "src/common_entities/abstract.entity";

@Entity()
export class BlogDetailed extends AbstractEntity<BlogDetailed>{
    @PrimaryGeneratedColumn('uuid')
    blog_id:string;
    @Column()
    blog_content:string;
    @OneToOne(()=>Blog,(obj)=>obj.blog_detail,{cascade:true})
    blogs:Blog;
    @OneToMany(()=>Comment,(comment)=>comment.blogs,{cascade:true})
    comment:Comment[];
    @OneToOne(()=>Media,(obj)=>obj.blog_details,{eager:true})
    medias:Media;
    @ManyToMany(()=>Tag,(obj)=>obj.blog_detail)
    tags:Tag[];
}