import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) {}

    public async createAndSave(
        email: string,
        hashedPassword: string,
        hashedRefreshToken: string | null,
    ): Promise<UserEntity> {
        const user = this.create(email, hashedPassword);

        return this.save(user.email, user.hashedPassword, hashedRefreshToken);
    }

    public async save(
        email: string,
        hashedPassword: string,
        hashedRefreshToken: string | null,
    ): Promise<UserEntity> {
        return this.repository.save({
            email,
            hashedPassword,
            hashedRefreshToken,
        });
    }

    public async setRefreshToken(
        userId: number,
        hashedRefreshToken: string | null,
    ): Promise<UserEntity> {
        const user = await this.getById(userId);

        const updatedUser: UserEntity = {
            ...user,
            hashedRefreshToken,
        };

        return this.repository.save(updatedUser);
    }

    public async findOneBy({
        id,
        email,
    }: {
        id?: number;
        email?: string;
    }): Promise<UserEntity | undefined> {
        if (typeof email === 'undefined' && typeof id === 'undefined') {
            return undefined;
        }

        const user = await this.repository.findOneBy({ id, email });

        return user;
    }

    private create(email: string, hashedPassword: string): UserEntity {
        return this.repository.create({ email, hashedPassword });
    }

    private async getById(userId: number): Promise<UserEntity> {
        return this.repository.findOneBy({ id: userId });
    }
}
