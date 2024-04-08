import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { TypeOrmError } from '../../shared/services/typeorm-error.service';
import { usersConfig } from '../config/users.config';
import { CreateUserRequest } from '../dtos/create-user-request.dto';
import { UserWithEmailAlreadyExistsException } from '../exceptions/user-with-email-already-exists.exception';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';

const { updater, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = updater.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: CreateUserRequest): Promise<UserEntity> {
		const user = UserEntity.create(request.id, request.name, request.email, request.password);

		try {
			return this.repository.create(user);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new UserWithEmailAlreadyExistsException(context, request.email);
			}
			logger.error(error);
			throw error;
		}
	}
}
