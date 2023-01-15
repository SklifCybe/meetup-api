import { Injectable, NotFoundException } from '@nestjs/common';

import { PageDto } from '../dto/page.dto';
import { MeetupEntity } from '../entity/meetup.entity';
import { PageOptionDto } from '../dto/page-option.dto';
import { CreateMeetupDto } from '../dto/create-meetup.dto';
import { UpdateMeetupDto } from '../dto/update-meetup.dto';
import { generateKeywords } from '../../utils/generate-keywords';
import { MeetupRepository } from '../repository/meetup.repository';
import { KeywordRepository } from '../repository/keyword.repository';
import { ErrorMessageMeetup } from '../constant/error-message-meetup';
import { KeywordEntity } from '../entity/keyword.entity';

@Injectable()
export class MeetupService {
    constructor(
        private readonly meetupRepository: MeetupRepository,
        private readonly keywordRepository: KeywordRepository,
    ) {}

    public async findAll(pageOptionDto: PageOptionDto): Promise<PageDto> {
        const { sort, order, page, size, ...meetupFields } = pageOptionDto;

        const skip = (page - 1) * size;

        const [meetups, meetupCount] = await this.meetupRepository.findAndCount(
            sort,
            order,
            skip,
            size,
            meetupFields,
        );

        return new PageDto({
            meetups,
            meetupCount,
            page,
            size,
        });
    }

    public async findById(id: number): Promise<MeetupEntity> {
        try {
            const meetup = await this.meetupRepository.findOneByOrFail(id);

            return meetup;
        } catch {
            throw new NotFoundException(ErrorMessageMeetup.notFound);
        }
    }

    public async registrationNewMeetup(
        createMeetupDto: CreateMeetupDto,
    ): Promise<MeetupEntity> {
        const { keywords, ...meetup } = createMeetupDto;

        const newMeetup = await this.meetupRepository.createAndSave(meetup);

        await this.generateAndSaveKeywords(keywords, newMeetup);

        return this.findById(newMeetup.id);
    }

    public async edit(
        id: number,
        updateMeetupDto: UpdateMeetupDto,
    ): Promise<MeetupEntity> {
        const existedMeetup = await this.findById(id);

        await this.meetupRepository.createAndSave({
            ...existedMeetup,
            ...updateMeetupDto,
        });

        if (updateMeetupDto.keywords.length !== 0) {
            await this.generateAndSaveKeywords(updateMeetupDto.keywords, existedMeetup);
        }

        return this.findById(id);
    }

    public async remove(id: number): Promise<MeetupEntity> {
        const meetup = await this.findById(id);

        return this.meetupRepository.remove(meetup);
    }

    private async generateAndSaveKeywords(
        keywords: string[],
        meetup: MeetupEntity,
    ): Promise<KeywordEntity[]> {
        const generatedKeywords = generateKeywords(keywords, meetup);

        return this.keywordRepository.createAndSave(generatedKeywords);
    }
}
