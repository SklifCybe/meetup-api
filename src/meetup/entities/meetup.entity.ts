import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MeetupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // todo: maybe add theme like union type [programming, hr, ...other]

    @Column()
    description: string;

    @Column()
    keywords: string;

    @Column({ type: 'timestamptz' })
    time: Date;

    @Column()
    location: string;
}
