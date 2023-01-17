import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

import type {
    ValidationOptions,
    ValidatorConstraintInterface,
} from 'class-validator';

import { ErrorMessage } from '../constants/error-message';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidate implements ValidatorConstraintInterface {
    constructor(private readonly userRepository: UserRepository) {}

    public async validate(email?: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ email });

        return !user;
    }

    public defaultMessage(): string {
        return ErrorMessage.EmailExist;
    }
}

export function IsEmailUnique(options?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            validator: IsEmailUniqueValidate,
        });
    };
}
