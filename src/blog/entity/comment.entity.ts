import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogDetailed } from "./blogDetail.entity";
import { user } from "src/user/entity/user.entity";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    comment_id:string;
    @Column()
    comment_data:string;
    @Column('uuid')
    blog_id:string;
    @Column()
    user_id:string;
    @ManyToOne(()=>BlogDetailed,(blog)=>blog.comment,{onDelete:'CASCADE'})
    @JoinColumn({name:'blog_id',referencedColumnName:'blog_id'})
    blogs:BlogDetailed;
    @ManyToOne(()=>user,(obj)=>obj.comments,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id',referencedColumnName:'user_id'})
    user:user;
}
