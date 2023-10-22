import { Column, Entity } from "typeorm";
import { CoreEntity } from "../../../core/core.entity";

@Entity('users')
export class User extends CoreEntity {
    @Column({ default: '', nullable: true })
    firstName: string;

    @Column({ default: '', nullable: true })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: '', nullable: true })
    phone: string;

    @Column({ default: '', nullable: true })
    image: string;

    @Column({ default: '', nullable: true })
    streetAddress: string;

    @Column({ default: '', nullable: true })
    city: string;

    @Column({ default: '', nullable: true })
    zipCode: string;

    @Column({ default: '', nullable: true })
    state: string;

    @Column({ default: '', nullable: true })
    country: string;

    @Column({ name: 'role', default: 3 })
    role: UserRole;

    @Column({ name: 'userType', default: 'customer' })
    userType: string;
}

