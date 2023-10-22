import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
// import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { Constants } from "src/utils/constants";
import { CreateNewsletterDto } from "./dto/create-newsletter.dto";
import { UpdateNewsletterDto } from "./dto/update-newsletter.dto";
import { NewsletterService } from "./newsletter.service";

@Controller({ path: "newsletter", version: Constants.API_VERSION_1 })

export class NewsletterController {
    constructor(private readonly service: NewsletterService) {}

    @Post()
    create(@Body() dto: CreateNewsletterDto) {
        return this.service.create(dto);
    }

    @Get()
    // @UseGuards(AdminAuthGuard)
    findAll(
        @Query('page') pageParam: string,
        @Query('limit') limitParam: string
    ) {
        const page = parseInt(pageParam, 10);
        const limit = parseInt(limitParam, 10);
        return this.service.findAll(page, limit);
    }

    @Get(":id")
    // @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    // @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateNewsletterDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    // @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.remove(id);
    }
}
