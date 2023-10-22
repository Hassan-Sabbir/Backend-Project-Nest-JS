import { Module } from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import JwtConfigService from "src/core/jwt/jwt-config.service";
import JwtHelper from "src/core/jwt/jwt.helper";
import { NewsletterRepository } from "./newsletter.repository";
import { NewsletterController } from "./newsletter.controller";
import { NewsletterService } from "./newsletter.service";
import { Newsletter } from "./entities/newsletter.entity";
import { UsersRepository } from "../users/users.repository";

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        TypeOrmModule.forFeature([UsersRepository]),
        TypeOrmModule.forFeature([Newsletter])
    ],
    controllers: [NewsletterController],
    providers: [NewsletterService, NewsletterRepository, JwtHelper]
})
export class NewsletterModule {}
