import { Transform, Type } from 'class-transformer';
import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
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
    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public readonly id?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public readonly name?: string;

    @ApiPropertyOptional({ enum: MeetupTheme })
    @IsOptional()
    @IsEnum(MeetupTheme)
    public readonly theme?: MeetupTheme;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public readonly description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public override readonly keywords?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsISO8601()
    public readonly time?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public readonly location?: string;

    @ApiPropertyOptional({ enum: MeetupField })
    @IsOptional()
    @IsEnum(MeetupField)
    public readonly sort?: MeetupField = MeetupField.Id;

    @ApiPropertyOptional({ enum: Order })
    @IsOptional()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    @IsEnum(Order)
    public readonly order?: Order = Order.Asc;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    public readonly page?: number = DefaultPage.Number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Max(50)
    @IsInt()
    public readonly size?: number = DefaultPage.Size;
}
