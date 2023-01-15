import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { CreateMeetupDto } from './create-meetup.dto';
import { MeetupThemes } from '../../types/meetup-themes';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
    @IsOptional()
    public name?: string;

    @IsOptional()
    public theme?: MeetupThemes;

    @IsOptional()
    public description?: string;

    @IsOptional()
    public keywords?: string[];

    @IsOptional()
    public time?: Date;

    @IsOptional()
    public location?: string;
}
