import { OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsISO8601,
    IsString,
    IsNotEmpty,
    IsEnum,
    ArrayUnique,
} from 'class-validator';

import { MeetupEntity } from '../entity/meetup.entity';
import { MeetupFields } from '../constant/meetup-fields';
import { MeetupThemes } from '../constant/meetup-themes';

export class CreateMeetupDto extends OmitType(MeetupEntity, [
    MeetupFields.Id,
    MeetupFields.Keywords,
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

    @IsString({ each: true })
    @ArrayUnique()
    public keywords: string[];

    @IsISO8601()
    public time: Date;

    @IsString()
    @IsNotEmpty()
    public location: string;
}
