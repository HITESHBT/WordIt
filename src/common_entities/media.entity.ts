import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { MediaType } from "./mediaType.entity";
import { user } from "src/user/entity/user.entity";
import { BlogDetailed } from "src/blog/entity/blogDetail.entity";
import { AbstractEntity } from "./abstract.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Media extends AbstractEntity<Media>{
    @PrimaryGeneratedColumn('uuid')
    media_id:string;
    @Column('uuid',{nullable:true}) @Exclude()
    user_id:string;
    @Column('uuid',{nullable:true})
    blog_id:string;
    @Column()
    image_url:string;
    @Column()
    media_type:string;
    @OneToOne(()=>user,(obj)=>obj.media_one,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id',referencedColumnName:'user_id'})
    userss:user;
    @ManyToOne(()=>BlogDetailed,(obj)=>obj.medias,{onDelete:'CASCADE'})
    @JoinColumn({name:'blog_id',referencedColumnName:'blog_id'})
    blog_details:BlogDetailed;
}