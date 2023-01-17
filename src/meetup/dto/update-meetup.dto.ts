import { IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateMeetupDto } from './create-meetup.dto';
import { MeetupTheme } from '../../common/constants/meetup-theme';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
    @ApiProperty()
    @IsOptional()
    public readonly name?: string;

    @ApiProperty()
    @IsOptional()
    public readonly theme?: MeetupTheme;

    @ApiProperty()
    @IsOptional()
    public readonly description?: string;

    @ApiProperty()
    @IsOptional()
    public readonly keywords?: string[];

    @ApiProperty()
    @IsOptional()
    public readonly time?: Date;

    @ApiProperty()
    @IsOptional()
    public readonly location?: string;
}
