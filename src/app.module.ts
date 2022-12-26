import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeetupModule } from './meetup/meetup.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions), MeetupModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
