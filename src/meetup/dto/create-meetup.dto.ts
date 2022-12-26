import { OmitType } from '@nestjs/swagger';
import { IsISO8601, IsString, IsNotEmpty } from 'class-validator';

import { MeetupEntity } from '../entities/meetup.entity';

export class CreateMeetupDto extends OmitType(MeetupEntity, ['id'] as const) {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    keywords: string;

    @IsISO8601()
    time: Date;

    @IsString()
    @IsNotEmpty()
    location: string;
}
