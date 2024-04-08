import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ValidationException } from '../../app/modules/shared/exceptions/validation.exception';
import { UserEntity } from '../../app/modules/users/persistence/user.entity';
import { config } from '../app/index';

const { sentry } = config;

@Injectable()
export class SentryInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		if (!sentry.enabled) {
			return next.handle();
		}

		return next.handle().pipe(
			catchError((error: never) => {
				this.sendSentryEvent(error, context);

				return throwError(error);
			}),
		);
	}

	private sendSentryEvent(error: never, context: ExecutionContext): void {
		const { message, status }: { message: string; status: number } = error;

		const mustSend = sentry.blankList.includes(status);

		if (mustSend) {
			this.setCustomData(context);

			checkValidationException(error);

			Sentry.setExtras({ Error: { message, status } });
			Sentry.captureException(error);
		}
	}

	private setCustomData(context: ExecutionContext): void {
		const request = context.switchToHttp().getRequest<Request>();
		this.setUser(request);
		this.setCorrelation(request);
	}

	private setCorrelation(request: Request): void {
		const correlation = request['X-Correlation-id'] as string;
		Sentry.setTag('correlation', correlation);
		Sentry.setExtra('Correlation', correlation);
	}

	private setUser(request: Request): void {
		const { user } = request;

		if (user) {
			const { id, name, email } = user as UserEntity;
			Sentry.setUser({ id, name, email });
		}
	}
}

function checkValidationException(err): void {
	const extras = { 'Validation errors': { message: err.response } };
	if (err instanceof ValidationException) {
		Sentry.setExtras(extras);
	}
}
