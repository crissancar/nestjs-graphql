import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const gqlExecutionContext = GqlExecutionContext.create(ctx);

	const request = gqlExecutionContext.getContext().req;

	const { authUser } = request;

	return authUser;
});
