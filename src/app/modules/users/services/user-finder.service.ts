import { Inject, Injectable } from '@nestjs/common';

import { usersConfig } from '../config/users.config';
import { FindUserRequest } from '../dtos/find-user-request.dto';
import { UserNotExistsException } from '../exceptions/user-not-exists.exception';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';

const { finderById, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;

@Injectable()
export class UserFinder {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUserRequest): Promise<UserEntity> {
		const foundUser = await this.repository.findBy(request.options);

		if (!foundUser) {
			throw new UserNotExistsException(context);
		}

		return foundUser;
	}
}
