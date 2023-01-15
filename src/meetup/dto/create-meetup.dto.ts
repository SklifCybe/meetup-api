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
    public readonly name: string;

    @Type(() => String)
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    @IsEnum(MeetupThemes)
    public readonly theme: MeetupThemes;

    @IsString()
    @IsNotEmpty()
    public readonly description: string;

    @IsString({ each: true })
    @ArrayUnique()
    public readonly keywords: string[];

    @IsISO8601()
    public readonly time: Date;

    @IsString()
    @IsNotEmpty()
    public readonly location: string;
}
