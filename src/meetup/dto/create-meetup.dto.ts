import { OmitType } from '@nestjs/swagger';
import { IsISO8601, IsString, IsNotEmpty } from 'class-validator';

import { MeetupFields } from '../../types/meetup-fields';
import { MeetupEntity } from '../entities/meetup.entity';

export class CreateMeetupDto extends OmitType(MeetupEntity, [
    MeetupFields.Id,
] as const) {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public description: string;

    @IsString()
    @IsNotEmpty()
    public keywords: string;

    @IsISO8601()
    public time: Date;

    @IsString()
    @IsNotEmpty()
    public location: string;
}
