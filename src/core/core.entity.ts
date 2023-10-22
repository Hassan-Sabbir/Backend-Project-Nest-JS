import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class CoreEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ name: 'createdAt', type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @Column({ default: false })
    isDeleted: boolean;
}