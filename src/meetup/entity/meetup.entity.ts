import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';

import { KeywordEntity } from './keyword.entity';
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

    @OneToMany(() => KeywordEntity, (keyword) => keyword.meetup, {
        eager: true,
    })
    @Transform(({ value }: { value: KeywordEntity[] }) =>
        value.map(({ name }) => name),
    )
    [MeetupFields.Keywords]: string[] | string;

    @Column({ type: 'timestamptz' })
    [MeetupFields.Time]: Date;

    @Column()
    [MeetupFields.Location]: string;
}
