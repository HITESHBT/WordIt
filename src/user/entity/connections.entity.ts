import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class Connections{
    @PrimaryGeneratedColumn('uuid')
    connection_id:string;
    @Column('uuid')
    followedby_id:string;
    @Column('uuid')
    followedto_id:'string';
    @ManyToOne(()=>Profile,{onDelete:"CASCADE"})
    @JoinColumn({name:'followedby_id',referencedColumnName:"user_id"})
    profile_fb:Profile;
    @ManyToOne(()=>Profile,{onDelete:"CASCADE"})
    @JoinColumn({name:'followedto_id',referencedColumnName:"user_id"})
    profile_ft:Profile;
}