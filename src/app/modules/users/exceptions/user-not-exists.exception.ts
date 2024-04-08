import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class UserNotExistsException extends HttpException {
	constructor(context: string) {
		const message = 'User not exists';
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.NOT_FOUND);
	}
}
