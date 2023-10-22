import { CoreEntity } from "src/core/core.entity";
import { Column, Entity } from "typeorm";

@Entity("newsletter")
export class Newsletter extends CoreEntity {
    @Column()
    email: string;
}
