import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class UserWithIdNotExistsException extends HttpException {
	constructor(context: string, id: string) {
		const message = `User with id <${id}> not exists`;
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.NOT_FOUND);
	}
}
