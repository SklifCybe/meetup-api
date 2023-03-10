import { ApiProperty } from '@nestjs/swagger';

import { MeetupEntity } from '../entity/meetup.entity';

type PageDtoParameters = {
    meetups: MeetupEntity[];
    page: number;
    size: number;
    meetupCount: number;
};

export class PageDto {
    @ApiProperty({ isArray: true, type: MeetupEntity })
    public readonly data: MeetupEntity[];

    public readonly meta: {
        page: number;
        size: number;
        meetupCount: number;
        pageCount: number;
    };

    constructor({ meetups, page, size, meetupCount }: PageDtoParameters) {
        const meta = {
            page,
            size,
            meetupCount,
            pageCount: this.calculatePageCount(meetupCount, size),
        };

        this.data = meetups;
        this.meta = meta;
    }

    private calculatePageCount(meetupCount: number, size: number): number {
        return Math.ceil(meetupCount / size);
    }
}
