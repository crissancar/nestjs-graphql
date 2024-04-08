import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class UpdateUserFailedException extends HttpException {
	constructor(context: string) {
		const message = 'Update user failed';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
