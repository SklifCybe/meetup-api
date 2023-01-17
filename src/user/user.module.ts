import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserRepository, UserService],
    exports: [UserRepository, UserService],
})
export class UserModule {}