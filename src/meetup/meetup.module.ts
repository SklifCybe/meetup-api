import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeetupEntity } from './entity/meetup.entity';
import { KeywordEntity } from './entity/keyword.entity';
import { MeetupService } from './service/meetup.service';
import { MeetupController } from './controller/meetup.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MeetupEntity, KeywordEntity])],
    controllers: [MeetupController],
    providers: [MeetupService],
})
export class MeetupModule {}
