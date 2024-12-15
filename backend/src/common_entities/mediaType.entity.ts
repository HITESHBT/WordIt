import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./media.entity";
import { AbstractEntity } from "./abstract.entity";

@Entity()
export class MediaType extends AbstractEntity<MediaType>{
    @PrimaryGeneratedColumn('uuid')
    media_id:string;
    @Column()
    media_type:string;
    @OneToOne(()=>Media,(obj)=>obj.media_type,{cascade:true})
    media:Media;
}