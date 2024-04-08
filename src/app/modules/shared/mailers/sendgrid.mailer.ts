import ResponseError from '@sendgrid/helpers/classes/response-error';
import SendGrid from '@sendgrid/mail';

import { config } from '../../../../config/app/index';
import { LoggerFactory } from '../services/logger-factory.service';
import { sendgridMailerConfig } from './config/sendgrid-mailer.config';
import { SendgridSendMailRequest } from './dtos/sendgrid-send-mail-request.dto';
import { SendgridException } from './exceptions/sendgrid.exception';
import { SendgridSentryEvents } from './services/sendgrid-sentry-events.service';

const { sendgrid } = config;

const { constants } = sendgridMailerConfig;
const { context } = constants;

const logger = LoggerFactory.create(context);

export class SendgridMailer {
	protected async send(
		request: SendgridSendMailRequest | Array<SendgridSendMailRequest>,
		multiple?: boolean,
	): Promise<void> {
		if (!sendgrid.enabled) {
			logger.log('Sendgrid disabled');

			return;
		}

		try {
			logger.debug({ data: request }, 'Sendgrid request');

			const result = await SendGrid.send(request, multiple);

			logger.debug({ data: result[0] }, 'Sendgrid response');
		} catch (error) {
			const exception = new SendgridException(request, error as ResponseError);

			SendgridSentryEvents.exception(exception);

			logger.error(exception);

			throw exception;
		}
	}
}
