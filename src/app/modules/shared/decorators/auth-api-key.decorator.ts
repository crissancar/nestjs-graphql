import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { AuthenticatedApiKey } from '../dtos/authenticated-api-key.dto';

export const AuthApiKey = createParamDecorator((data: string, context: ExecutionContext) => {
	const request = context.switchToHttp().getRequest<Request>();

	const { apiKey } = request;

	return AuthenticatedApiKey.create(apiKey);
});
