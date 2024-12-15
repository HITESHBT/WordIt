import { user } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogDetailed } from "./blogDetail.entity";
import { Like } from "./likes.entity";
import { AbstractEntity } from "src/common_entities/abstract.entity";

@Entity()
export class Blog extends AbstractEntity<Blog>{
    @PrimaryGeneratedColumn('uuid')
    blog_id:string
    @Column()
    user_id:string;
    @Column()
    blog_title:string;
    @ManyToOne(()=>user,(person)=>person.blog,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id',referencedColumnName:'user_id'})
    user:user;
    @OneToOne(()=>BlogDetailed,(obj)=>obj.blogs,{onDelete:"CASCADE"},)
    @JoinColumn({name:'blog_id',referencedColumnName:'blog_id'})
    blog_detail:BlogDetailed;
    @OneToMany(()=>Like,(obj)=>obj.blog)
    likes:Like[];
}