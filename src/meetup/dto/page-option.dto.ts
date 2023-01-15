import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsISO8601,
    IsOptional,
    IsString,
    IsInt,
    IsEnum,
    Min,
    Max,
} from 'class-validator';

import { Order } from '../constant/order';
import { DefaultPage } from '../constant/page';
import { MeetupEntity } from '../entity/meetup.entity';
import { MeetupThemes } from '../constant/meetup-themes';
import { MeetupFields } from '../constant/meetup-fields';

export class PageOptionDto extends PartialType(MeetupEntity) {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public readonly id?: number;

    @IsOptional()
    @IsString()
    public readonly name?: string;

    @IsOptional()
    @IsEnum(MeetupThemes)
    public readonly theme?: MeetupThemes;

    @IsOptional()
    @IsString()
    public readonly description?: string;

    @IsOptional()
    @IsString()
    public override readonly keywords?: string;

    @IsOptional()
    @IsISO8601()
    public readonly time?: Date;

    @IsOptional()
    @IsString()
    public readonly location?: string;

    @IsOptional()
    @IsEnum(MeetupFields)
    public readonly sort?: MeetupFields = MeetupFields.Id;

    @IsOptional()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    @IsEnum(Order)
    public readonly order?: Order = Order.Asc;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public readonly page?: number = DefaultPage.Number;

    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Max(50)
    @IsInt()
    public readonly size?: number = DefaultPage.Size;
}
