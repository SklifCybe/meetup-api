import { OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsISO8601, IsString, IsNotEmpty, IsEnum } from 'class-validator';

import { MeetupFields } from '../../types/meetup-fields';
import { MeetupEntity } from '../entity/meetup.entity';
import { MeetupThemes } from '../../types/meetup-themes';

export class CreateMeetupDto extends OmitType(MeetupEntity, [
    MeetupFields.Id,
] as const) {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @Type(() => String)
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    @IsEnum(MeetupThemes)
    public theme: MeetupThemes;

    @IsString()
    @IsNotEmpty()
    public description: string;

    @IsString()
    @IsNotEmpty()
    public keywords: string;

    @IsISO8601()
    public time: Date;

    @IsString()
    @IsNotEmpty()
    public location: string;
}
