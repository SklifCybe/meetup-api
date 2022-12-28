import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString, IsInt, IsEnum } from 'class-validator';

import { MeetupEntity } from '../entities/meetup.entity';
import { MeetupFields } from '../../types/meetup-fields';
import { Order } from '../../types/order';

export class PageOptionDto extends PartialType(MeetupEntity) {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public id?: number;

    @IsOptional()
    @IsString()
    public name?: string;

    @IsOptional()
    @IsString()
    public description?: string;

    @IsOptional()
    @IsString()
    public keywords?: string;

    @IsOptional()
    @IsISO8601()
    public time?: Date;

    @IsOptional()
    @IsString()
    public location?: string;

    @IsOptional()
    @IsEnum(MeetupFields)
    public sort?: MeetupFields = MeetupFields.Id;

    @IsOptional()
    @IsEnum(Order)
    public order?: Order = Order.Asc;
}
