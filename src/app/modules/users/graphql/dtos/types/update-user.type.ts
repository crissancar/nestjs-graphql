import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserType {
	@Field(() => ID, { description: 'The user uuid' })
	id: string;

	@Field({ nullable: true, description: 'The user name' })
	name: string;

	@Field({ nullable: true, description: 'The user email' })
	email: string;
}
