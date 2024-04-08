import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class InvalidTokenException extends HttpException {
	constructor(context: string) {
		const message = 'Invalid token';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
