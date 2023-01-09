import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Transform } from 'class-transformer';
import { MeetupEntity } from './meetup.entity';

@Entity()
export class KeywordEntity {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Transform(({ value }) => value)
    name: string;

    @ManyToOne(() => MeetupEntity, (meetup) => meetup.keywords, {
        onDelete: 'CASCADE',
    })
    meetup: MeetupEntity;
}
