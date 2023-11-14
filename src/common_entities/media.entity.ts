import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MediaType } from "./mediaType.entity";
import { user } from "src/user/entity/user.entity";
import { BlogDetailed } from "src/blog/entity/blogDetail.entity";

@Entity()
export class Media{
    @PrimaryGeneratedColumn('uuid')
    media_id:string;
    @Column('uuid')
    user_id:string;
    @Column('uuid')
    blog_id:string;
    @Column()
    image_url:string;
    @OneToOne(()=>MediaType,(obj)=>obj.media_id)
    media_type:MediaType;
    @ManyToOne(()=>user,(obj)=>obj.media)
    @JoinColumn({name:'user_id',referencedColumnName:'user_id'})
    user:user;
    @OneToOne(()=>user)
    userss:user;
    @ManyToOne(()=>BlogDetailed,(obj)=>obj.media)
    blog_detail:BlogDetailed;
    @ManyToOne(()=>BlogDetailed,(obj)=>obj.medias)
    @JoinColumn({name:'blog_id',referencedColumnName:'blog_id'})
    blog_details:BlogDetailed;
}