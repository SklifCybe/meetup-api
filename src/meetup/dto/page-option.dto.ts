import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsISO8601, IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';

import { Order } from '../../types/order';
import { MeetupEntity } from '../entities/meetup.entity';
import { MeetupFields } from '../../types/meetup-fields';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../constants/page';

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
    @Transform(({ value }: { value: string}) => value.toUpperCase())
    @IsEnum(Order)
    public order?: Order = Order.Asc;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public page?: number = DEFAULT_PAGE_NUMBER;
    
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Max(50)
    @IsInt()
    public size?: number = DEFAULT_PAGE_SIZE;
}
