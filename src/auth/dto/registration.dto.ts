import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsEmailUnique } from '../../common/validations/is-email-unique.decorator';

export class RegistrationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @IsEmailUnique()
    public readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public readonly password: string;
}
