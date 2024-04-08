import { Sentry } from '../../services/sentry.service';
import { SendgridException } from '../exceptions/sendgrid.exception';

export class SendgridSentryEvents {
	static exception(exception: SendgridException): void {
		const extras = {
			'Sendgrid request': exception.request,
			'Sendgrid response': exception.response,
		};

		Sentry.sendException<typeof exception>({ exception, extras });
	}
}
