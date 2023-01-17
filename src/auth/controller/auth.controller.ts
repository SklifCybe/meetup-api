import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { LoginDto } from '../dto/login.dto';
import { TokensResponse } from './tokens.response';
import { AuthService } from '../service/auth.service';
import { RegistrationDto } from '../dto/registration.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator';
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator';

import type { Tokens } from '../../common/types/tokens';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({
        type: TokensResponse,
    })
    @Public()
    @Post('registration')
    @HttpCode(HttpStatus.CREATED)
    public async registration(
        @Body() registrationDto: RegistrationDto,
    ): Promise<Tokens> {
        return new TokensResponse(
            await this.authService.registration(registrationDto),
        );
    }

    @ApiOkResponse({
        type: TokensResponse,
    })
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() loginDto: LoginDto): Promise<Tokens> {
        return new TokensResponse(await this.authService.login(loginDto));
    }

    @ApiBearerAuth()
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    public async logout(@GetCurrentUserId() userId: number): Promise<void> {
        return this.authService.logout(userId);
    }

    @ApiBearerAuth()
    @ApiOkResponse({
        type: TokensResponse,
    })
    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    public async refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
        return new TokensResponse(
            await this.authService.refreshTokens(userId, refreshToken),
        );
    }
}
