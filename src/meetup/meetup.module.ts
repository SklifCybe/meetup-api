import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeetupEntity } from './entity/meetup.entity';
import { MeetupService } from './service/meetup.service';
import { MeetupController } from './controller/meetup.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MeetupEntity])],
    controllers: [MeetupController],
    providers: [MeetupService],
})
export class MeetupModule {}
