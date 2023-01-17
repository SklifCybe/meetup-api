import { Transform, Type } from 'class-transformer';
import { OmitType, ApiProperty } from '@nestjs/swagger';
import {
    IsISO8601,
    IsString,
    IsNotEmpty,
    IsEnum,
    ArrayUnique,
} from 'class-validator';

import { MeetupEntity } from '../entity/meetup.entity';
import { MeetupField } from '../../common/constants/meetup-field';
import { MeetupTheme } from '../../common/constants/meetup-theme';

export class CreateMeetupDto extends OmitType(MeetupEntity, [
    MeetupField.Id,
    MeetupField.Keywords,
] as const) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @ApiProperty({ enum: MeetupTheme, enumName: 'MeetupTheme' })
    @Type(() => String)
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    @IsEnum(MeetupTheme)
    public readonly theme: MeetupTheme;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public readonly description: string;

    @ApiProperty({ isArray: true, type: String })
    @IsString({ each: true })
    @ArrayUnique()
    public readonly keywords: string[];

    @ApiProperty()
    @IsISO8601()
    public readonly time: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public readonly location: string;
}
