import { validate } from 'class-validator';

import { ValidationException } from '../exceptions/validation.exception';

export class ClassValidator {
	static async run(data: object): Promise<void> {
		const errors = await validate(data);

		if (errors.length > 0) {
			throw new ValidationException(errors);
		}
	}
}
