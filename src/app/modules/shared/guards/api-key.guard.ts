import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { InvalidApiKeyException } from '../../api-keys/exceptions/invalid-api-key.exception';
import { ApiKeyEntity } from '../../api-keys/persistence/api-key.entity';
import { apiKeyGuardConstants } from '../config/constants/api-key-guard.constants';

const { context, passportStrategy } = apiKeyGuardConstants;

@Injectable()
export class ApiKeyGuard extends AuthGuard(passportStrategy) {
	getRequest(context: ExecutionContext): unknown {
		const gqlExecutionContext = GqlExecutionContext.create(context);

		return gqlExecutionContext.getContext().req;
	}

	// @ts-ignore
	handleRequest(
		error: unknown,
		apiKey: ApiKeyEntity,
		info: unknown,
		executionContext: GqlExecutionContext,
	): ApiKeyEntity {
		const gqlExecutionContext = GqlExecutionContext.create(executionContext);

		const request = gqlExecutionContext.getContext().req;

		if (!apiKey) {
			throw new InvalidApiKeyException(context);
		}

		request.apiKey = apiKey;

		return apiKey;
	}
}
