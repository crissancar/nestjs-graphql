import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ValidationException } from '../../app/modules/shared/exceptions/validation.exception';
import { HTTPExceptionData } from '../../app/modules/shared/interfaces/http-exception-data.interface';
import { LoggerFactory } from '../../app/modules/shared/services/logger-factory.service';

const logger = LoggerFactory.create('ExceptionsFilter');

enum ExceptionMessages {
	INTERNAL_SERVER_ERROR = 'Internal server error',
	VALIDATION_ERROR = 'DTO validation error',
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		if (!(exception instanceof HttpException)) {
			this.modelInternalServerError(exception, response);

			return;
		}

		if (exception instanceof ValidationException) {
			this.modelValidationException(exception, response);

			return;
		}

		this.modelHttpException(exception, response);
	}

	private modelInternalServerError(exception: unknown, response: Response): void {
		const status = HttpStatus.INTERNAL_SERVER_ERROR;
		const message = ExceptionMessages.INTERNAL_SERVER_ERROR;
		const loggerMessage = `${status}, ${ExceptionMessages.INTERNAL_SERVER_ERROR}`;

		logger.error(exception);
		logger.error(loggerMessage);

		this.createResponse(status, message, response);
	}

	private modelValidationException(exception: ValidationException, response: Response): void {
		const status = exception.getStatus();
		const message = exception.getResponse() as string;
		const loggerMessage = `${status}, ${ExceptionMessages.VALIDATION_ERROR}: [${message}]`;

		logger.error(loggerMessage);

		this.createResponse(status, message, response);
	}

	private modelHttpException(exception: HttpException, response: Response): void {
		const status = exception.getStatus();
		const message = exception.message;
		const loggerMessage = `${status}, ${message}`;

		const exceptionResponse = exception.getResponse() as HTTPExceptionData;

		if (exceptionResponse.context) {
			const httpExceptionLogger = LoggerFactory.create(exceptionResponse.context);
			httpExceptionLogger.error(loggerMessage);
		} else {
			logger.error(loggerMessage);
		}

		this.createResponse(status, message, response);
	}

	private createResponse(status: number, message: string, response: Response): void {
		response.status(status).json({
			status,
			message,
		});
	}
}
