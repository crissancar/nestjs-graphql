import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { TypeOrmError } from '../../shared/services/typeorm-error.service';
import { usersConfig } from '../config/users.config';
import { UpdateUserFailedException } from '../exceptions/update-user-failed.exception';
import { UserWithEmailAlreadyExistsException } from '../exceptions/user-with-email-already-exists.exception';
import { UpdateUserInput } from '../graphql/dtos/inputs/update-user.input';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';

const { updater, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = updater.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserUpdater {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(input: UpdateUserInput): Promise<UserEntity> {
		try {
			const updatedUser = await this.repository.update(input.id, input);

			if (!updatedUser) {
				throw new UpdateUserFailedException(context);
			}

			return updatedUser;
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new UserWithEmailAlreadyExistsException(context, input.email);
			}
			logger.error(error);
			throw error;
		}
	}
}
