import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogDetailed } from "./blogDetail.entity";

@Entity()
export class Tag{
    @PrimaryGeneratedColumn('uuid')
    tag_id:string;
    @Column()
    tag_name:string;
    @ManyToMany(()=>BlogDetailed,(obj)=>obj.tags)
    @JoinTable()
    blog_detail:BlogDetailed[];
}