import { MeetupEntity } from '../meetup/entity/meetup.entity';

export const generateKeywords = (keywords: string[], meetup: MeetupEntity) =>
    keywords.map((keyword) => ({
        name: keyword,
        meetup,
    }));
