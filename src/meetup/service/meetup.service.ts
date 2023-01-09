import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PageDto } from '../dto/page.dto';
import { PageOptionDto } from '../dto/page-option.dto';
import { MeetupEntity } from '../entity/meetup.entity';
import { KeywordEntity } from '../entity/keyword.entity';
import { CreateMeetupDto } from '../dto/create-meetup.dto';
import { UpdateMeetupDto } from '../dto/update-meetup.dto';
import { generateKeywords } from '../../utils/generate-keywords';
import { ErrorMessageMeetup } from '../constant/error-message-meetup';

@Injectable()
export class MeetupService {
    constructor(
        @InjectRepository(MeetupEntity)
        private readonly meetupRepository: Repository<MeetupEntity>,
        @InjectRepository(KeywordEntity)
        private readonly keywordRepository: Repository<KeywordEntity>,
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
            const meetup = await this.meetupRepository.findOneByOrFail({ id })

            return meetup;
        } catch {
            throw new NotFoundException(ErrorMessageMeetup.notFound);
        }
    }

    async registrationNewMeetup(createMeetupDto: CreateMeetupDto) {
        const { keywords, ...meetup } = createMeetupDto;

        const newMeetup = this.meetupRepository.create(meetup);
        await this.meetupRepository.save(newMeetup);

        const generatedKeywords = generateKeywords(keywords, newMeetup);

        const newKeywords = this.keywordRepository.create(generatedKeywords);
        await this.keywordRepository.save(newKeywords);

        return this.findById(newMeetup.id);
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
