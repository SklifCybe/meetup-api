import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { CreateMeetupDto } from './create-meetup.dto';
import { MeetupThemes } from '../constant/meetup-themes';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
    @IsOptional()
    public readonly name?: string;

    @IsOptional()
    public readonly theme?: MeetupThemes;

    @IsOptional()
    public readonly description?: string;

    @IsOptional()
    public readonly keywords?: string[];

    @IsOptional()
    public readonly time?: Date;

    @IsOptional()
    public readonly location?: string;
}
