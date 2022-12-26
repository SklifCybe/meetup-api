import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeetupController } from './meetup.controller';
import { MeetupService } from './meetup.service';
import { MeetupEntity } from './entities/meetup.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MeetupEntity])],
    controllers: [MeetupController],
    providers: [MeetupService],
})
export class MeetupModule {}