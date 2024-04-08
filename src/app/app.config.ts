import { Provider, ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';

import { config } from '../config/app';
import { GraphQLExceptionsFilter } from '../config/filters/graphql-exceptions.filter';
import { ValidationException } from './modules/shared/exceptions/validation.exception';
import { SignatureGuard } from './modules/shared/guards/signature.guard';

export const providersConfig: Array<Provider> = [
	// {
	// 	provide: APP_INTERCEPTOR,
	// 	useFactory: () => new SentryInterceptor(),
	// },
	// {
	// 	provide: APP_INTERCEPTOR,
	// 	useFactory: () => new TransformInterceptor(),
	// },
	{
		provide: APP_FILTER,
		useFactory: () => new GraphQLExceptionsFilter(),
	},
	// {
	// 	provide: APP_GUARD,
	// 	useClass: BlacklistIPGuard,
	// },
	{
		provide: APP_PIPE,
		useFactory: () =>
			new ValidationPipe({
				exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
				whitelist: true,
				forbidNonWhitelisted: true,
			}),
	},
	...(config.client.signature.enabled
		? [
				{
					provide: APP_GUARD,
					useClass: SignatureGuard,
				},
			]
		: []),
];
