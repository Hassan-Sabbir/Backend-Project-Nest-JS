import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phone: string;

    @IsOptional()
    image: string;

    @IsOptional()
    streetAddress: string;

    @IsOptional()
    city: string;

    @IsOptional()
    zipCode: string;

    @IsOptional()
    state: string;

    @IsOptional()
    country: string;

    @IsNotEmpty()
    role: UserRole;

    @IsNotEmpty()
    userType: string;
}
