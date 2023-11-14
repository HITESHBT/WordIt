import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { user } from "./user.entity";
import { AbstractEntity } from "src/common_entities/abstract.entity";

@Entity()
@Unique(['user_id'])
export class Credential extends AbstractEntity<Credential>{
    @PrimaryGeneratedColumn('uuid')
    user_id:string;
    @PrimaryGeneratedColumn('uuid')
    access_key:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @OneToOne(()=>user,(obj)=>obj.users)
    user:user
}