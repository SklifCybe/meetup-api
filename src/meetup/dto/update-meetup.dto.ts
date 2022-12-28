import { IsOptional } from 'class-validator'
import { PartialType } from '@nestjs/swagger';

import { CreateMeetupDto } from './create-meetup.dto';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {
    @IsOptional()
    public name?: string;
    
    @IsOptional()
    public description?: string;

    @IsOptional()
    public keywords?: string;

    @IsOptional()
    public time?: Date;

    @IsOptional()
    public location?: string;
}
