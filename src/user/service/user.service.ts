import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable } from '@nestjs/common';

import { hash } from '../../utils/hash';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    private readonly SALT = Number(this.configService.get<string>('SALT'));

    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) {}

    public async findOneBy(
        { userId, email }: { userId?: number; email?: string },
        error?: { message: string; statusCode: number },
    ): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({ id: userId, email });

        if (!user) {
            throw new HttpException(error?.message, error?.statusCode);
        }

        return user;
    }

    public async updateRefreshTokenHash(
        userId: number,
        refreshToken: string | null,
    ): Promise<void> {
        if (refreshToken === null) {
            await this.userRepository.setRefreshToken(userId, refreshToken);
            return;
        }

        const hashedRefreshToken = await hash(refreshToken, this.SALT);

        await this.userRepository.setRefreshToken(userId, hashedRefreshToken);
    }
}
