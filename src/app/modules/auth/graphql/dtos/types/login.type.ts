import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
	@Field(() => String, { description: 'The access token' })
	accessToken: string;

	@Field(() => String, { description: 'The refresh token' })
	refreshToken: string;
}
