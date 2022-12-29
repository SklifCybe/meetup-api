import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { MeetupFields } from '../../types/meetup-fields';

@Entity()
export class MeetupEntity {
    @PrimaryGeneratedColumn()
    [MeetupFields.Id]: number;

    @Column()
    [MeetupFields.Name]: string;

    // todo: maybe add theme like union type [programming, hr, ...other]

    @Column()
    [MeetupFields.Description]: string;

    @Column()
    // todo: maybe create other table
    [MeetupFields.Keywords]: string;

    @Column({ type: 'timestamptz' })
    [MeetupFields.Time]: Date;

    @Column()
    [MeetupFields.Location]: string;
}
