import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../interfaces/http-exception-data.interface';

export class UserIsNotOwnerException extends HttpException {
	constructor(context: string) {
		const message = 'User is not owner';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
