import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { user } from "./user.entity";
import { Connections } from "./connections.entity";
import { AbstractEntity } from "src/common_entities/abstract.entity";

@Entity()
export class Profile extends AbstractEntity<Profile>
{
    @PrimaryColumn('uuid')
    user_id:string;
    @Column()
    description:string;
    @Column({default:0})
    follower_no:number;
    @Column({default:0})
    following_no:number;
    @OneToOne(()=>user,{onDelete:'CASCADE',cascade:true})
    @JoinColumn({name:'user_id',referencedColumnName:'user_id'})
    users: user;
    @OneToMany(()=>Connections,(conn)=>conn.profile_fb)
    following:Connections[];
    @OneToMany(()=>Connections,(conn)=>conn.followedto_id)
    follower:Connections[];
}