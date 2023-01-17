import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, Injectable, ForbiddenException } from '@nestjs/common';

import { hash } from '../../utils/hash';
import { Token } from '../constant/token';
import { LoginDto } from '../dto/login.dto';
import { RegistrationDto } from '../dto/registration.dto';
import { UserService } from '../../user/service/user.service';
import { ErrorMessage } from '../../common/constants/error-message';
import { UserRepository } from '../../user/repository/user.repository';

import type { Tokens } from '../../types/tokens';
import type { JwtPayload } from '../../types/jwt-payload';

@Injectable()
export class AuthService {
    private readonly SALT = Number(this.configService.get<string>('SALT'));

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {}

    public async registration(
        registrationDto: RegistrationDto,
    ): Promise<Tokens> {
        const hashedPassword = await hash(registrationDto.password, this.SALT);

        const user = await this.userRepository.createAndSave(
            registrationDto.email,
            hashedPassword,
            null,
        );

        const tokens = await this.generateTokens({
            sub: user.id,
            email: registrationDto.email,
        });

        await this.userService.updateRefreshTokenHash(
            user.id,
            tokens.refreshToken,
        );

        return tokens;
    }

    public async login(loginDto: LoginDto): Promise<Tokens> {
        const user = await this.userService.findOneBy(
            { email: loginDto.email },
            {
                message: ErrorMessage.AccessDenied,
                statusCode: HttpStatus.FORBIDDEN,
            },
        );

        const passwordMatches = await bcrypt.compare(
            loginDto.password,
            user.hashedPassword,
        );

        if (!passwordMatches) {
            throw new ForbiddenException(ErrorMessage.AccessDenied);
        }

        const tokens = await this.generateTokens({
            sub: user.id,
            email: user.email,
        });

        await this.userService.updateRefreshTokenHash(
            user.id,
            tokens.refreshToken,
        );

        return tokens;
    }

    public async logout(userId: number): Promise<void> {
        await this.userService.updateRefreshTokenHash(userId, null);
    }

    public async refreshTokens(
        userId: number,
        refreshToken: string,
    ): Promise<Tokens> {
        const user = await this.userService.findOneBy(
            { userId },
            {
                message: ErrorMessage.AccessDenied,
                statusCode: HttpStatus.FORBIDDEN,
            },
        );

        if (!user.hashedRefreshToken) {
            throw new ForbiddenException(ErrorMessage.AccessDenied);
        }

        const refreshTokensMatches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
        
        if (!refreshTokensMatches) {
            throw new ForbiddenException(ErrorMessage.AccessDenied);
        }

        const tokens = await this.generateTokens({
            sub: user.id,
            email: user.email,
        });

        await this.userService.updateRefreshTokenHash(
            user.id,
            tokens.refreshToken,
        );

        return tokens;
    }

    private async generateTokens(jwtPayload: JwtPayload): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>(Token.AccessToken),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>(Token.RefreshToken),
                expiresIn: '7d',
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
