import { IsNotEmpty } from "class-validator";

export class CreateNewsletterDto {
    @IsNotEmpty()
    readonly email: string;
}
