import { Module } from '@nestjs/common';
import process from "process";
import {SequelizeModule} from "@nestjs/sequelize";

//import { TypeOrmModule } from '@nestjs/typeorm';
//import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     url: configService.get('POSTGRES_URI'),
    //     autoLoadEntities: true,
    //     synchronize: true, // shouldn't be used in production - may lose data
    //   }),
    //
    //   inject: [ConfigService],
    // }),

    // Добавим в список импортов Sequelize - современную ORM для работы с TypeScript и Node.js.
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD as string,
      database: process.env.POSTGRES_DB,
      //models: [User, Role, Profile, Token, TextBlock, Files], // Зарегистрируем модели для таблички пользователей, ролей и их связей.
      autoLoadModels: true
    }),


  ],
})
export class PostgresDBModule {}
