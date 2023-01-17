import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MeetupModule } from './meetup/meetup.module';
import { dataSourceOptions } from '../db/data-source';
import { AccessTokenGuard } from './common/guards/access-token.guard';
import { IsEmailUniqueValidate } from './common/validations/is-email-unique.decorator';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(dataSourceOptions),
        MeetupModule,
        UserModule,
        AuthModule,
    ],
    providers: [
        IsEmailUniqueValidate,
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
    ],
})
export class AppModule {}
