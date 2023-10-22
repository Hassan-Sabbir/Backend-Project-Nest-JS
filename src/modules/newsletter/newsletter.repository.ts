import { DataSource, Repository } from "typeorm";
import { CreateNewsletterDto } from "./dto/create-newsletter.dto";
import { UpdateNewsletterDto } from "./dto/update-newsletter.dto";
import { Newsletter } from "./entities/newsletter.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NewsletterRepository extends Repository<Newsletter> {

    constructor (dataSource: DataSource) {
        super(Newsletter, dataSource.createEntityManager());
    }

    async createEntity(dto: CreateNewsletterDto): Promise<Newsletter | Error> {
        try {
            const { email } = dto;
            const entity = this.create({
                email
            });
            await this.save(entity);
            return entity;
        } catch (e) {
            return e;
        }
    }

    async findOneEntity(id: string): Promise<Newsletter | Error> {
        try {
            return await this.findOne({ where: { id:id } });
        } catch (e) {
            return e;
        }
    }

    async updateEntity(id: string, dto: UpdateNewsletterDto): Promise<Newsletter | Error> {
        try {
            await this.update(id, {
                email: dto.email
            });
            return await this.findOne({ where: { id:id } });
        } catch (e) {
            return e;
        }
    }

    async findByFilterQuery(query: any): Promise<Newsletter[] | Error> {
        try {
            return await this.find({
                where: { ...query, isDeleted: false }
            });
        } catch (e) {
            return e;
        }
    }
    async findByPagination(limit?: number, page?: number): Promise<any | Error> {
        try {
            let findOptions: any = {}
            const count = await this.find({ where: { ...findOptions, isDeleted: false } })
            const pageCount = Math.ceil(count.length / limit);
            const data = await this.find(
                {
                    take: limit,
                    skip: limit * (page - 1),
                    order: { createdAt: "DESC" },
                    where: { isDeleted: false }
                }
            );
            return {
                page: page,
                limit: limit,
                pageCount: pageCount,
                data
            }
        } catch (e) {
            return e;
        }
    }

    async deleteEntity(id: string): Promise<boolean | Error> {
        try {
            const updateResult = await this
                .createQueryBuilder()
                .update(Newsletter)
                .set({ isDeleted: true })
                .where("id = :id", { id: id })
                .execute();
            if (updateResult.affected > 0) {
                return true;
            }
            return false;
        } catch (e) {
            return e;
        }
    }

    async countAllQuery(): Promise<any | Error> {
        try {
            return await this.count({
                where: {
                    isDeleted: false
                }
            });
        } catch (e) {
            return e;
        }
    }
}