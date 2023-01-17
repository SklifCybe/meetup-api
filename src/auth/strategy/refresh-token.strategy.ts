import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, ForbiddenException } from '@nestjs/common';

import { Token } from '../constant/token';
import { ErrorMessage } from '../constant/error-message';

import type { JwtPayload } from '../../types/jwt-payload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>(Token.RefreshToken),
            passReqToCallback: true,
        });
    }

    validate(req: Request, jwtPayload: JwtPayload) {
        const refreshToken = req
            ?.get('authorization')
            ?.replace('Bearer', '')
            ?.trim();

        if (!refreshToken) {
            throw new ForbiddenException(ErrorMessage.RtMalformed);
        }

        return {
            ...jwtPayload,
            refreshToken,
        };
    }
}
