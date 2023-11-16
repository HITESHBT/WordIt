import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Blog } from "./blog.entity";
import { Comment } from "./comment.entity";
import { Like } from "./likes.entity";
import { Media } from "src/common_entities/media.entity";
import { Tag } from "./tag.entity";

@Entity()
export class BlogDetailed{
    @PrimaryColumn('uuid')
    blog_id:string;
    @Column()
    blog_content:string;
    @Column('uuid')
    media_id:string;
    @OneToOne(()=>Blog,{onDelete:"CASCADE"})
    @JoinColumn({name:'blog_id',referencedColumnName:'blog_id'})
    blogs:Blog;
    @OneToMany(()=>Comment,(comment)=>comment.blogs)
    comment:Comment[];
    @OneToMany(()=>Media,(obj)=>obj.blog_details,{cascade:true})
    medias:Media[];
    @ManyToMany(()=>Tag,(obj)=>obj.blog_detail)
    tags:Tag[];
}