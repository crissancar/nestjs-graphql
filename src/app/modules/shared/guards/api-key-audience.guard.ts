import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { apiKeyAudienceGuardConstants } from '../config/constants/api-key-audience-guard.constants';
import { InvalidApiKeyAudienceException } from '../exceptions/invalid-api-key-audience.exception';

const { context } = apiKeyAudienceGuardConstants;

@Injectable()
export class ApiKeyAudienceGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const validAudiences = this.reflector.get<Array<string>>('audiences', context.getHandler());

		const apiKeyAudience = this.getApiKeyAudience(context);

		this.checkApiKeyAudience(apiKeyAudience, validAudiences);

		return true;
	}

	private getApiKeyAudience(context: ExecutionContext): ApiKeyAudiences {
		const gqlExecutionContext = GqlExecutionContext.create(context);

		const request = gqlExecutionContext.getContext().req;

		const apiKey = request.apiKey;

		return apiKey.audience;
	}

	private checkApiKeyAudience(
		apiKeyAudience: ApiKeyAudiences,
		validAudiences: Array<string>,
	): void {
		if (!this.areValidAudiences(apiKeyAudience, validAudiences)) {
			throw new InvalidApiKeyAudienceException(context);
		}
	}

	private areValidAudiences(
		apiKeyAudience: ApiKeyAudiences,
		validAudiences: Array<string>,
	): boolean {
		return validAudiences.includes(apiKeyAudience);
	}
}
