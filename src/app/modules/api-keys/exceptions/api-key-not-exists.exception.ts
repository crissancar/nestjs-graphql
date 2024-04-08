import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class ApiKeyNotExistsException extends HttpException {
	constructor(context: string) {
		const message = 'Api key not exists';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.NOT_FOUND);
	}
}
