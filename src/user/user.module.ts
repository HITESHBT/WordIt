import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connections } from './entity/connections.entity';
import { Credential } from './entity/credential.entity';
import { Profile } from './entity/profile.entity';
import { user } from './entity/user.entity';
import { Media } from 'src/common_entities/media.entity';
import { MediaType } from 'src/common_entities/mediaType.entity';

@Module({
    providers:[UserService],
    controllers:[UserController],
    imports:[TypeOrmModule.forFeature([Connections,Credential,Profile,user,Media,MediaType])]
})
export class UserModule {}
