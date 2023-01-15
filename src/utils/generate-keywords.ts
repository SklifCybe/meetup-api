import { MeetupEntity } from '../meetup/entity/meetup.entity';

import type { GeneratedKeywords } from '../types/generated-keywords';

export const generateKeywords = (
    keywords: string[],
    meetup: MeetupEntity,
): GeneratedKeywords =>
    keywords.map((keyword) => ({
        name: keyword,
        meetup,
    }));
