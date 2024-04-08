import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../interfaces/http-exception-data.interface';

export class InvalidSignatureException extends HttpException {
	constructor(context: string) {
		const message = 'Invalid signature';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
