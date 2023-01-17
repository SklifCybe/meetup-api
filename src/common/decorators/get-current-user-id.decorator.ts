import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { JwtPayload } from '../types/jwt-payload';

export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): number => {
        const request: Request = context.switchToHttp().getRequest();

        const user = request.user as JwtPayload;

        return user.sub;
    },
);
