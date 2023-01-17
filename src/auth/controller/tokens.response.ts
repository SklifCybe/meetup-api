import { ApiProperty } from '@nestjs/swagger';

import { Tokens } from '../../common/types/tokens';

export class TokensResponse {
    @ApiProperty({
        type: 'string',
    })
    public readonly accessToken: string;

    @ApiProperty({
        type: 'string',
    })
    public readonly refreshToken: string;

    constructor({ accessToken, refreshToken }: Tokens) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
