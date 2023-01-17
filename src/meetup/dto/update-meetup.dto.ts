import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { CreateMeetupDto } from './create-meetup.dto';
import { MeetupTheme } from '../../common/constants/meetup-theme';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
    @IsOptional()
    public readonly name?: string;

    @IsOptional()
    public readonly theme?: MeetupTheme;

    @IsOptional()
    public readonly description?: string;

    @IsOptional()
    public readonly keywords?: string[];

    @IsOptional()
    public readonly time?: Date;

    @IsOptional()
    public readonly location?: string;
}
