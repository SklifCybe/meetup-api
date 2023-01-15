import { Transform } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { KeywordEntity } from './keyword.entity';
import { MeetupThemes } from '../constant/meetup-themes';

@Entity()
export class MeetupEntity {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public readonly name: string;

    @Column({ type: 'enum', enum: MeetupThemes })
    public readonly theme: MeetupThemes;

    @Column()
    public readonly description: string;

    @OneToMany(() => KeywordEntity, (keyword) => keyword.meetup, {
        eager: true,
    })
    @Transform(({ value }: { value: KeywordEntity[] }) =>
        value.map(({ name }) => name),
    )
    public readonly keywords: string[] | string;

    @Column({ type: 'timestamptz' })
    public readonly time: Date;

    @Column()
    public readonly location: string;
}
