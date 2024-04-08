import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { UserAudiences } from '../../../../shared/enums/user-audiences.enum';
import { Timestamp } from '../../../../shared/models/timestamp.model';

registerEnumType(UserAudiences, { name: 'UserAudiences' });

@ObjectType()
export class FindUserType extends Timestamp {
	@Field(() => ID, { description: 'The user id' })
	id: string;

	@Field({ description: 'The user name' })
	name: string;

	@Field({ description: 'The user email' })
	email: string;

	@Field(() => [UserAudiences], { description: 'The user audiences' })
	audiences: Array<UserAudiences>;
}
