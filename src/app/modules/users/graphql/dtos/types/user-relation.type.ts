import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { UserAudiences } from '../../../../shared/enums/user-audiences.enum';

registerEnumType(UserAudiences, { name: 'UserAudiences' });

@ObjectType()
export class UserRelationType {
	@Field(() => ID, { description: 'The user uuid' })
	id: string;

	@Field({ nullable: true, description: 'The user email' })
	email: string;
}
