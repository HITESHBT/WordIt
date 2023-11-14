import { join } from "path";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./credential.entity";
import { Profile } from "./profile.entity";
import { Blog } from "src/blog/entity/blog.entity";
import { Comment } from "src/blog/entity/comment.entity";
import { Media } from "src/common_entities/media.entity";

@Entity()
export class user{
    @PrimaryColumn('uuid')
    user_id:string;
    @Column()
    user_name:string;
    @Column()
    media_id:string;
    @OneToOne(()=>Credential,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id',referencedColumnName:'user_id'})
    users:Credential;
    @OneToMany(()=>Blog,(user)=>user.user)
    blog:Blog[];
    @OneToOne(()=>Profile)
    profile:Profile;
    @OneToMany(()=>Comment,(obj)=>obj.user)
    comments:Comment[];
    @OneToMany(()=>Media,(obj)=>obj.user)
    media:Media[];
    @OneToOne(()=>Media)
    @JoinColumn({name:'media_id',referencedColumnName:'media_id'})
    media_one:Media;
}