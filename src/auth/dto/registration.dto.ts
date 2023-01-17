import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsEmailUnique } from '../../common/validations/is-email-unique.decorator';

export class RegistrationDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @IsEmailUnique()
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    public readonly password: string;
}
