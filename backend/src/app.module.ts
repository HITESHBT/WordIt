import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule,BlogModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: "ep-noisy-field-84793365.ap-southeast-1.aws.neon.tech",
    url:"postgres://hiteshsharmakolkata:5FvRJkDV7fwy@ep-noisy-field-84793365.ap-southeast-1.aws.neon.tech/neondb",
    username: "hiteshsharmakolkata",
    password: "5FvRJkDV7fwy",
    database: "neondb",
    entities: [__dirname+'/**/*.entity{.ts,.js}'],
    logging: true,
    synchronize: true,
    ssl:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
