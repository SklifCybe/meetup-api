import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { FindOptionsWhere } from 'typeorm';

import { Order } from '../../types/order';
import { MeetupEntity } from '../entity/meetup.entity';
import { MeetupFields } from '../../types/meetup-fields';

@Injectable()
export class MeetupRepository {
    constructor(
        @InjectRepository(MeetupEntity)
        private readonly repository: Repository<MeetupEntity>,
    ) {}

    public async findAndCount(
        sort: MeetupFields,
        order: Order,
        skip: number,
        take: number,
        where?: FindOptionsWhere<MeetupEntity>,
    ): Promise<[MeetupEntity[], number]> {
        const meetups = await this.repository.findAndCount({
            where,
            order: {
                [sort]: order,
            },
            skip,
            take,
        });

        return meetups;
    }

    public async findOneByOrFail(id: number): Promise<MeetupEntity> {
        return this.repository.findOneByOrFail({ id });
    }

    public async remove(meetup: MeetupEntity): Promise<MeetupEntity> {
        return this.repository.remove(meetup);
    }

    public async createAndSave(
        meetup: Partial<MeetupEntity>,
    ): Promise<MeetupEntity> {
        const newMeetup = this.create(meetup);

        return this.repository.save(newMeetup);
    }

    private create(meetup: Partial<MeetupEntity>): MeetupEntity {
        return this.repository.create(meetup);
    }

    private async save(meetup: MeetupEntity): Promise<MeetupEntity> {
        return this.repository.save(meetup);
    }
}
