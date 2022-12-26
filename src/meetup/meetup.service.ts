import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupEntity } from './entities/meetup.entity';
import { ErrorMessageMeetup } from './constants/error-message-meetup';

@Injectable()
export class MeetupService {
    constructor(
        @InjectRepository(MeetupEntity)
        private readonly meetupRepository: Repository<MeetupEntity>,
    ) {}

    async findAll() {
        return this.meetupRepository.find();
    }

    async findById(id: number) {
        try {
            const meetup = await this.meetupRepository.findOneByOrFail({ id });

            return meetup;
        } catch {
            throw new NotFoundException(ErrorMessageMeetup.notFound);
        }
    }

    async registrationNewMeetup(createMeetupDto: CreateMeetupDto) {
        const newMeetup = this.meetupRepository.create(createMeetupDto);

        return this.meetupRepository.save(newMeetup);
    }

    async edit(id: number, updateMeetupDto: UpdateMeetupDto) {
        const existedMeetup = await this.findById(id);

        const newMeetup = {
            ...existedMeetup,
            ...updateMeetupDto,
        };

        return this.meetupRepository.save(newMeetup);
    }

    async remove(id: number) {
        const meetup = await this.findById(id);

        return this.meetupRepository.remove(meetup);
    }
}
