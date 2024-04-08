import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/interfaces/http-exception-data.interface';

export class BlockedIpException extends HttpException {
	constructor(context: string) {
		const message = 'IP address is blocked';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
