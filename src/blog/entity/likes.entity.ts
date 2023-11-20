import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BlogDetailed } from "./blogDetail.entity";
import { user } from "src/user/entity/user.entity";
import { Blog } from "./blog.entity";
import { AbstractEntity } from "src/common_entities/abstract.entity";

@Entity()
export class Like extends AbstractEntity<Like>{
    @PrimaryGeneratedColumn('uuid')
    like_id:string;
    @Column('uuid')
    blog_id:string;
    @Column('uuid')
    user_id:string;
    @ManyToOne(()=>Blog,(usr)=>usr.likes,{onDelete:'CASCADE'})
    @JoinColumn({name:'blog_id',referencedColumnName:'blog_id'})
    blog:Blog;
    @ManyToOne(()=>user,(obj)=>obj.like,{onDelete:"CASCADE"})
    @JoinColumn({name:'user_id',referencedColumnName:"user_id"})
    user:user;
}