import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { AbstractEntity } from "src/common_entities/abstract.entity";

@Entity()
export class Connections extends AbstractEntity<Connections>{
    @PrimaryGeneratedColumn('uuid')
    connection_id:string;
    @Column('uuid')
    followedby_id:string;
    @Column('uuid')
    followedto_id:string;
    @ManyToOne(()=>Profile,{onDelete:"CASCADE"})
    @JoinColumn({name:'followedby_id',referencedColumnName:"user_id"})
    profile_fb:Profile;
    @ManyToOne(()=>Profile,{onDelete:"CASCADE"})
    @JoinColumn({name:'followedto_id',referencedColumnName:"user_id"})
    profile_ft:Profile;
}