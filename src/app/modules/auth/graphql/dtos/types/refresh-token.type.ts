import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenType {
	@Field(() => String)
	accessToken: string;

	@Field(() => String)
	refreshToken: string;
}
