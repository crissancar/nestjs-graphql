import { Args, Query, Resolver } from '@nestjs/graphql';

import { EndpointJWTAuthentication } from '../../../shared/decorators/endpoint-jwt-authentication.decorator';
import {
	SelectOptions,
	SelectOptionsGenerator,
} from '../../../shared/decorators/select-options.decorator';
import { UserAudiences } from '../../../shared/enums/user-audiences.enum';
import { FindUserRequest } from '../../dtos/find-user-request.dto';
import { UserEntity } from '../../persistence/user.entity';
import { UserFinder } from '../../services/user-finder.service';
import { UsersFinderByCriteria } from '../../services/users-finder-by-criteria.service';
import { FindUserArgs } from '../dtos/args/find-user.args';
import { FindUsersArgs } from '../dtos/args/find-users.args';
import { FindUserType } from '../dtos/types/find-user.type';
import { FindUsersType } from '../dtos/types/find-users.type';

@Resolver()
export class UserQueryResolver {
	constructor(
		private readonly finder: UserFinder,
		private readonly finderByCriteria: UsersFinderByCriteria,
	) {}

	@EndpointJWTAuthentication(UserAudiences.GENERAL, UserAudiences.ADMIN)
	@Query(() => FindUserType, {
		name: 'FindUser',
		description: '*Find a user detail by id* \n\nAuthorization: Bearer',
	})
	async find(
		@Args() args: FindUserArgs,
		@SelectOptionsGenerator() selectOptions: SelectOptions<UserEntity>,
	): Promise<FindUserType> {
		const request = FindUserRequest.create('id', args.id, selectOptions);

		return this.finder.run(request);
	}

	@EndpointJWTAuthentication(UserAudiences.GENERAL, UserAudiences.ADMIN)
	@Query(() => FindUsersType, {
		name: 'FindUsers',
		description: '*Find users list by criteria filter* \n\nAuthorization: Bearer',
	})
	async findByCriteria(
		@Args() args: FindUsersArgs,
		@SelectOptionsGenerator() selectOptions: SelectOptions<UserEntity>,
	): Promise<FindUsersType> {
		return this.finderByCriteria.run({ ...args, selectOptions });
	}
}
