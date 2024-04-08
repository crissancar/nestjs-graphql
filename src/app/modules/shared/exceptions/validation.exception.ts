import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
	constructor(errors: Array<ValidationError>) {
		const errorsMessageArray = errors.reduce<Array<string>>((result, error) => {
			result.push(Object.values(error.constraints).toString());

			return result;
		}, []);

		super(errorsMessageArray, HttpStatus.BAD_REQUEST);
	}
}
