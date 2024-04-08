import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { authConfig } from '../config/auth.config';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

const { localGuard } = authConfig;
const { context } = localGuard.constants;

@Injectable()
export class LocalGuard extends AuthGuard('local') {
	getRequest(context: ExecutionContext): unknown {
		const gqlExecutionContext = GqlExecutionContext.create(context);
		const request = gqlExecutionContext.getContext().req;
		const input = gqlExecutionContext.getArgs().input;

		request.body = { ...input };

		return gqlExecutionContext.getContext().req;
	}

	// @ts-ignore
	handleRequest(
		error: unknown,
		user: AuthenticatedUser,
		info: unknown,
		executionContext: ExecutionContext,
	): boolean {
		const gqlExecutionContext = GqlExecutionContext.create(executionContext);

		const request = gqlExecutionContext.getContext().req;

		if (error) {
			throw error;
		}

		if (!user) {
			throw new InvalidCredentialsException(context);
		}

		request.authUser = user;

		return true;
	}
}
