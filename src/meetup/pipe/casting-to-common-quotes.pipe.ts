import { PipeTransform, Injectable } from '@nestjs/common';

import { PageOptionDto } from '../dto/page-option.dto';

@Injectable()
export class CastingToCommonQuotesPipe implements PipeTransform {
    transform(options: PageOptionDto) {
        const result: Partial<PageOptionDto> = {};

        Object.keys(options).forEach((key) => {
            if (typeof options[key] === 'string') {
                result[key] = options[key].replace(/['"]+/g, '');
            } else {
                result[key] = options[key];
            }
        });

        return result;
    }
}
