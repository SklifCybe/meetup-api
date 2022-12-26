import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString, IsInt } from 'class-validator';

import { MeetupEntity } from '../entities/meetup.entity';

export class PageOptionDto extends PartialType(MeetupEntity) {
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    public id?: number;

    @IsString()
    @IsOptional()
    public name?: string;

    @IsString()
    @IsOptional()
    public description?: string;

    @IsString()
    @IsOptional()
    public keywords?: string;

    @IsISO8601()
    @IsOptional()
    public time?: Date;

    @IsString()
    @IsOptional()
    public location?: string;
}
