import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { InvalidTokenException } from '../../auth/exceptions/invalid-token.exception';
import { UserEntity } from '../../users/persistence/user.entity';
import { jwtGuardConstants } from '../config/constants/jwt-guard.constants';

const { context, passportStrategy } = jwtGuardConstants;

@Injectable()
export class JwtGuard extends AuthGuard(passportStrategy) {
	getRequest(context: ExecutionContext): unknown {
		const gqlExecutionContext = GqlExecutionContext.create(context);

		return gqlExecutionContext.getContext().req;
	}

	// @ts-ignore
	handleRequest(
		error: unknown,
		user: UserEntity,
		info: unknown,
		executionContext: ExecutionContext,
	): UserEntity {
		const gqlExecutionContext = GqlExecutionContext.create(executionContext);

		const request = gqlExecutionContext.getContext().req;

		if (!user) {
			throw new InvalidTokenException(context);
		}

		request.authUser = user;

		return user;
	}
}
