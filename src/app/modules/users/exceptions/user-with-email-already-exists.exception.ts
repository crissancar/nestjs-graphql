import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class UserWithEmailAlreadyExistsException extends HttpException {
	constructor(context: string, email: string) {
		const message = `User with email <${email}> already exists`;
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
