import { Field, ObjectType } from '@nestjs/graphql';

import { FindUserType } from './find-user.type';

@ObjectType()
export class FindUsersType {
	@Field(() => [FindUserType])
	data: Array<FindUserType>;

	@Field(() => Number, { description: 'The total count of users' })
	count: number;

	@Field(() => Number, { description: 'The current count of users' })
	currentCount: number;

	@Field(() => Number, { description: 'The total take users' })
	take: number;

	@Field(() => Number, { description: 'The current page of users' })
	page: number;
}
