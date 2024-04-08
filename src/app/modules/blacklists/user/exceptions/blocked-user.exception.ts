import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/interfaces/http-exception-data.interface';

export class BlockedUserException extends HttpException {
	constructor(context: string) {
		const message = 'User is blocked';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
