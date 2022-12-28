import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString, IsInt, IsEnum } from 'class-validator';

import { MeetupEntity } from '../entities/meetup.entity';
import { MeetupFields } from '../../types/meetup-fields';
import { Order } from '../../types/order';

export class PageOptionDto extends PartialType(MeetupEntity) {
    // todo: under all properties decorator isOptional should stand. check every dto
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

    @IsOptional()
    @IsEnum(MeetupFields)
    public sort?: MeetupFields = MeetupFields.Id;

    @IsOptional()
    @IsEnum(Order)
    // todo: add default value. then you can don't check if sort has exist or not. 
    public order?: Order = Order.Asc;
}
