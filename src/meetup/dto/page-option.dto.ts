import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    Max,
    Min,
    IsInt,
    IsEnum,
    IsString,
    IsISO8601,
    IsOptional,
} from 'class-validator';

import { Order } from '../../common/constants/order';
import { MeetupEntity } from '../entity/meetup.entity';
import { DefaultPage } from '../../common/constants/page';
import { MeetupField } from '../../common/constants/meetup-field';
import { MeetupTheme } from '../../common/constants/meetup-theme';

export class PageOptionDto extends PartialType(MeetupEntity) {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public readonly id?: number;

    @IsOptional()
    @IsString()
    public readonly name?: string;

    @IsOptional()
    @IsEnum(MeetupTheme)
    public readonly theme?: MeetupTheme;

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
    @IsEnum(MeetupField)
    public readonly sort?: MeetupField = MeetupField.Id;

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
