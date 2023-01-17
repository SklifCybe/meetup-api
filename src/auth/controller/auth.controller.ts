import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';

import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { RegistrationDto } from '../dto/registration.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator';
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator';

import type { Tokens } from '../../types/tokens';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('registration')
    @HttpCode(HttpStatus.CREATED)
    public async registration(
        @Body() registrationDto: RegistrationDto,
    ): Promise<Tokens> {
        return this.authService.registration(registrationDto);
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() loginDto: LoginDto): Promise<Tokens> {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    public async logout(@GetCurrentUserId() userId: number): Promise<void> {
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    public async refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
