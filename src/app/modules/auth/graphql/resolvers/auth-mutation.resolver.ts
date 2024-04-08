import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ApiKeyAudiences } from '../../../api-keys/enums/api-key-audiences.enum';
import { EndpointJWTAuthentication } from '../../../shared/decorators/endpoint-jwt-authentication.decorator';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { LoginAuthentication } from '../../decorators/login-authentication.decorator';
import { AuthenticatedUser } from '../../dtos/authenticated-user.dto';
import { JwtCreator } from '../../services/jwt-creator.service';
import { LoginInput } from '../dtos/inputs/login.input';
import { LoginType } from '../dtos/types/login.type';
import { RefreshTokenType } from '../dtos/types/refresh-token.type';

@Resolver()
export class AuthMutationResolver {
	constructor(private readonly jwtCreator: JwtCreator) {}

	@LoginAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@Mutation(() => LoginType, {
		name: 'Login',
		description: '*Login and get tokens.* \n\nAuthorization: ApiKey',
	})
	login(@Args('input') input: LoginInput, @AuthUser() authUser: AuthenticatedUser): LoginType {
		return this.jwtCreator.run(authUser);
	}

	@EndpointJWTAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@Mutation(() => RefreshTokenType, {
		name: 'ResfreshToken',
		description: '*Refresh tokens*. \n\nAuthorization: Bearer',
	})
	refreshToken(@AuthUser() authUser: AuthenticatedUser): RefreshTokenType {
		return this.jwtCreator.run(authUser);
	}
}
