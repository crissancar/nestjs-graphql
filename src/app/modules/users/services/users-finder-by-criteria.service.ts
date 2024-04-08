import { Inject, Injectable } from '@nestjs/common';

import { usersConfig } from '../config/users.config';
import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria.request.dto';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';
import { UserCriteriaQuery } from '../persistence/user-criteria.query';
import { UserRepository } from '../repositories/user.repository';

const { repositoryInterface } = usersConfig.repository;

@Injectable()
export class UsersFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUsersByCriteriaRequest): Promise<FindUsersByCriteriaResponse> {
		const query = UserCriteriaQuery.create(request);

		const criteriaResult = await this.repository.findByCriteria(query);

		return FindUsersByCriteriaResponse.create(query, criteriaResult);
	}
}
