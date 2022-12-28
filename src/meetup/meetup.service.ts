import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupEntity } from './entities/meetup.entity';
import { ErrorMessageMeetup } from './constants/error-message-meetup';
import { PageOptionDto } from './dto/page-option.dto';
import { PageDto } from './dto/page.dto';

@Injectable()
export class MeetupService {
    constructor(
        @InjectRepository(MeetupEntity)
        private readonly meetupRepository: Repository<MeetupEntity>,
    ) {}

    async findAll(pageOptionDto: PageOptionDto) {
        const { sort, order, page, size, ...meetupFields } = pageOptionDto;

        const skip = (page - 1) * size;

        const [meetups, meetupCount] = await this.meetupRepository.findAndCount(
            {
                where: meetupFields,
                order: {
                    [sort]: order,
                },
                skip,
                take: size,
            },
        );

        return new PageDto({
            meetups,
            meetupCount,
            page,
            size,
        });
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
