import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Transform } from 'class-transformer';
import { MeetupEntity } from './meetup.entity';

@Entity()
export class KeywordEntity {
    @Exclude()
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    @Transform(({ value }) => value)
    public readonly name: string;

    @ManyToOne(() => MeetupEntity, (meetup) => meetup.keywords, {
        onDelete: 'CASCADE',
    })
    public readonly meetup: MeetupEntity;
}
