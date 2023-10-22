import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Constants } from "src/utils/constants";
import { ResponseUtils } from "src/utils/response.utils";
import { Not } from "typeorm";
import { CreateNewsletterDto } from "./dto/create-newsletter.dto";
import { UpdateNewsletterDto } from "./dto/update-newsletter.dto";
import { Newsletter } from "./entities/newsletter.entity";
import { NewsletterRepository } from "./newsletter.repository";

@Injectable()
export class NewsletterService {
    constructor(
        @InjectRepository(NewsletterRepository)
        private readonly repository: NewsletterRepository
    ) {
    }

    async create(dto: CreateNewsletterDto): Promise<Newsletter | Error> {
        const ifExists = await this.repository.findByFilterQuery({ email: dto.email });
        if (((ifExists) as Newsletter[]).length) {
            throw new BadRequestException(
                Constants.DUPLICATE_FOUND
            );
        }

        const data = await this.repository.createEntity(dto);
        if (!data) {
            throw new HttpException(
                Constants.CREATE_FAILED,
                HttpStatus.BAD_REQUEST
            );
        }
        return ResponseUtils.successResponseHandler(201, "Successfully subscribed to newsletter", "data", data);
    }

    async update(id: string, dto: UpdateNewsletterDto): Promise<Newsletter | Error> {
        const ifExists = await this.repository.findByFilterQuery({ email: dto.email, id: Not(id) });
        if (((ifExists) as Newsletter[]).length) {
            throw new BadRequestException(
                Constants.DUPLICATE_FOUND
            );
        }

        const res: any = await this.repository.findOneEntity(id);
        if (!res) {
            throw new HttpException(
                Constants.NOT_FOUND,
                HttpStatus.NOT_FOUND
            );
        }
        const data = await this.repository.updateEntity(id, dto);
        if (!data) {
            throw new HttpException(
                Constants.UPDATE_FAILED,
                HttpStatus.BAD_REQUEST
            );
        }
        return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
    }

    async findAll(page: number, limit: number): Promise<Newsletter[] | Error> {
        const data = page && limit ? await this.repository.findByPagination(limit, page) : await this.repository.findByFilterQuery({});
        if (!data) {
            throw new HttpException(
                Constants.NOT_FOUND,
                HttpStatus.NOT_FOUND
            );
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }

    async findOne(id: string): Promise<Newsletter[] | Error> {
        const data = await this.repository.findByFilterQuery({ id: id });
        if (!data) {
            throw new HttpException(
                Constants.NOT_FOUND,
                HttpStatus.NOT_FOUND
            );
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }

    async remove(id: string): Promise<boolean | Error> {
        const data = await this.repository.deleteEntity(id);
        if (!data) {
            throw new HttpException(
                Constants.NOT_FOUND,
                HttpStatus.NOT_FOUND
            );
        }
        return ResponseUtils.buildDeletedData(200, "Data deleted successfully", data);
    }
}
