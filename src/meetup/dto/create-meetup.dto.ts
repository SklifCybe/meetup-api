import { OmitType } from '@nestjs/swagger';
import { IsISO8601, IsString, Length } from 'class-validator'

import { MeetupEntity } from '../entities/meetup.entity';

export class CreateMeetupDto extends OmitType(MeetupEntity, ['id'] as const) {
    @IsString()
    // todo: remove all magic numbers and import from constants
    @Length(3, 128)
    name: string;
    
    @IsString()
    // todo: remove all magic numbers and import from constants
    @Length(5, 256)
    description: string;

    @IsString()
    // todo: remove all magic numbers and import from constants
    @Length(2, 256)
    keywords: string;

    @IsISO8601()
    time: Date;

    @IsString()
    // todo: remove all magic numbers and import from constants
    @Length(2, 15)
    location: string;
}
