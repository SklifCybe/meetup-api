import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { KeywordEntity } from '../entity/keyword.entity';

import type { GeneratedKeywords } from '../../common/types/generated-keywords';

@Injectable()
export class KeywordRepository {
    constructor(
        @InjectRepository(KeywordEntity)
        private readonly repository: Repository<KeywordEntity>,
    ) {}

    public async createAndSave(
        generatedKeywords: GeneratedKeywords,
    ): Promise<KeywordEntity[]> {
        const newKeywords = this.create(generatedKeywords);

        return this.save(newKeywords);
    }

    private create(generatedKeywords: GeneratedKeywords): KeywordEntity[] {
        return this.repository.create(generatedKeywords);
    }

    private async save(keywords: KeywordEntity[]): Promise<KeywordEntity[]> {
        return this.repository.save(keywords);
    }
}
