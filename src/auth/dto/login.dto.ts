import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public readonly password: string;
}
