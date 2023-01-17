import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { JwtPayloadWithRefreshToken } from '../types/jwt-payload-with-refresh-tokens';

export const GetCurrentUser = createParamDecorator(
    (
        data: keyof JwtPayloadWithRefreshToken | undefined,
        context: ExecutionContext,
    ) => {
        const request: Request = context.switchToHttp().getRequest();

        if (!data) {
            return request.user;
        }

        return request.user[data];
    },
);
