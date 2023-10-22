import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads')
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.HOST,
            port: parseInt(process.env.PORT),
            // username: process.env.USERNAME,
            username: 'root',
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: false
        }),
        UsersModule,
        NewsletterModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
