import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { MeetupFields } from '../../types/meetup-fields';
import { MeetupThemes } from '../../types/meetup-themes';

@Entity()
export class MeetupEntity {
    @PrimaryGeneratedColumn()
    [MeetupFields.Id]: number;

    @Column()
    [MeetupFields.Name]: string;

    @Column({ type: 'enum', enum: MeetupThemes })
    [MeetupFields.Theme]: MeetupThemes;

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
