import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { KeywordEntity } from './keyword.entity';
import { MeetupTheme } from '../../common/constants/meetup-theme';

@Entity()
export class MeetupEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @ApiProperty()
    @Column()
    public readonly name: string;

    @ApiProperty()
    @Column({ type: 'enum', enum: MeetupTheme })
    public readonly theme: MeetupTheme;

    @ApiProperty()
    @Column()
    public readonly description: string;

    @ApiProperty({ isArray: true, type: String })
    @OneToMany(() => KeywordEntity, (keyword) => keyword.meetup, {
        eager: true,
    })
    @Transform(({ value }: { value: KeywordEntity[] }) =>
        value.map(({ name }) => name),
    )
    public readonly keywords: string[] | string;

    @ApiProperty()
    @Column({ type: 'timestamptz' })
    public readonly time: Date;

    @ApiProperty()
    @Column()
    public readonly location: string;
}
