/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
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
export class GraphQLExceptionsFilter implements GqlExceptionFilter {
	catch(exception: any, host: ArgumentsHost): any {
		// const gqlHost = GqlArgumentsHost.create(host);

		if (!(exception instanceof HttpException)) {
			const status = HttpStatus.INTERNAL_SERVER_ERROR;
			const message = ExceptionMessages.INTERNAL_SERVER_ERROR;
			const loggerMessage = `${status}, ${ExceptionMessages.INTERNAL_SERVER_ERROR}`;

			exception.message = `[${message}]`;
			exception.extensions = { type: ExceptionMessages.VALIDATION_ERROR, status };

			logger.error(exception);
			logger.error(loggerMessage);

			const customException = exception;
			customException.message = message;
			customException.extensions = {
				type: exception.name,
				status,
			};

			return customException;
		}

		if (exception instanceof ValidationException) {
			const customException = exception as any;
			const status = exception.getStatus();
			const message = exception.getResponse() as string;
			const loggerMessage = `${status}, ${ExceptionMessages.VALIDATION_ERROR}: [${message}]`;

			logger.error(loggerMessage);

			customException.message = `[${message}]`;
			customException.extensions = { type: exception.name, status };

			return customException;
		}

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

		const customException = exception as any;
		customException.message = message;
		customException.extensions = {
			type: exception.name,
			status,
		};

		// REST response
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		if (response.status) {
			response.status(status).json({
				status,
				message,
			});
		}

		// GraphQL return
		return customException;
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

	private createResponse(status: number, message: string, response): void {
		response.status(status).json({
			status,
			message,
		});
	}
}
