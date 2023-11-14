import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Media } from "./media.entity";

@Entity()
export class MediaType{
    @PrimaryColumn('uuid')
    media_id:string;
    @Column()
    media_type:string;
    @OneToOne(()=>Media)
    @JoinColumn({name:'media_id',referencedColumnName:'media_id'})
    media:Media;
}