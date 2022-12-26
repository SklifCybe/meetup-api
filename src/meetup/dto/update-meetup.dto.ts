import { IsOptional } from 'class-validator'
import { PartialType } from '@nestjs/swagger';

import { CreateMeetupDto } from './create-meetup.dto';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
    @IsOptional()
    name?: string;
    
    @IsOptional()
    description?: string;

    @IsOptional()
    keywords?: string;

    @IsOptional()
    time?: Date;

    @IsOptional()
    location?: string;
}
