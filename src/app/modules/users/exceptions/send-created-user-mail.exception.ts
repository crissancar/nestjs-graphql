import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class SendCreatedUserMailException extends HttpException {
	constructor(context: string, id: string) {
		const message = `Send mail to created user <${id}> failed`;
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
