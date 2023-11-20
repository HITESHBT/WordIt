import { join } from "path";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./credential.entity";
import { Profile } from "./profile.entity";
import { Blog } from "src/blog/entity/blog.entity";
import { Comment } from "src/blog/entity/comment.entity";
import { Media } from "src/common_entities/media.entity";
import { AbstractEntity } from "src/common_entities/abstract.entity";
import { Like } from "src/blog/entity/likes.entity";

@Entity()
export class user extends AbstractEntity<user>{
    @PrimaryColumn('uuid')
    user_id:string;
    @Column()
    user_name:string;
    @OneToOne(()=>Credential,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id',referencedColumnName:'user_id'})
    users:Credential;
    @OneToMany(()=>Blog,(user)=>user.user)
    blog:Blog[];
    @OneToOne(()=>Profile)
    profile:Profile;
    @OneToMany(()=>Comment,(obj)=>obj.user)
    comments:Comment[];
    @OneToOne(()=>Media,(obj)=>obj.userss,{cascade:true,eager:true})
    media_one:Media;
    @OneToMany(()=>Like,(obj)=>obj.user)
    like:Like[];
}