import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@sentry/node';

import { ApiKeyAudiences } from '../../../api-keys/enums/api-key-audiences.enum';
import { EndpointApiKeyAuthentication } from '../../../shared/decorators/endpoint-api-key-authentication.decorator';
import { EndpointJWTAuthentication } from '../../../shared/decorators/endpoint-jwt-authentication.decorator';
import { ResourceCheck } from '../../../shared/decorators/resource-check.decorator';
import { UuidGenerator } from '../../../shared/decorators/uuid-generator.decorator';
import { UserAudiences } from '../../../shared/enums/user-audiences.enum';
import { UserCreator } from '../../services/user-creator.service';
import { UserUpdater } from '../../services/user-updater.service';
import { CreateUserInput } from '../dtos/inputs/create-user.input';
import { UpdateUserInput } from '../dtos/inputs/update-user.input';
import { CreateUserType } from '../dtos/types/create-user.type';
import { UpdateUserType } from '../dtos/types/update-user.type';

@Resolver()
export class UserMutationResolver {
	constructor(
		private readonly creator: UserCreator,
		private readonly updater: UserUpdater,
	) {}

	@EndpointApiKeyAuthentication(ApiKeyAudiences.GENERAL, ApiKeyAudiences.ADMIN)
	@Mutation(() => CreateUserType, {
		name: 'CreateUser',
		description: '*Create a user* \n\nAuthorization: ApiKey',
	})
	async create(
		@UuidGenerator() id: string,
		@Args('input') input: CreateUserInput,
	): Promise<CreateUserType> {
		return this.creator.run({ ...input, id });
	}

	@EndpointJWTAuthentication(UserAudiences.GENERAL, UserAudiences.ADMIN)
	@ResourceCheck('UserEntity')
	@Mutation(() => UpdateUserType, {
		name: 'UpdateUser',
		description: '*Update a user* \n\nAuthorization: Bearer',
	})
	async update(@Args('input') input: UpdateUserInput): Promise<User> {
		return this.updater.run({ ...input });
	}
}
