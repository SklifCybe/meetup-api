import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column({ unique: true })
    public readonly email: string;

    @Column()
    public readonly hashedPassword: string;

    @Column({ nullable: true })
    public readonly hashedRefreshToken?: string;

    @CreateDateColumn()
    public readonly createdAt: Date;
}
