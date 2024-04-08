import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class InvalidCredentialsException extends HttpException {
	constructor(context: string) {
		const message = 'Invalid credentials';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
