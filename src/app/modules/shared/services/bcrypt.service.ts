import { compareSync, hashSync } from 'bcrypt';

import { config } from '../../../../config/app/index';

const { bcrypt } = config;

export class Bcrypt {
	static hash(value: string): string {
		const salt = bcrypt.salt;
		const pepper = bcrypt.pepper;

		const valueWithPepper = value.concat(pepper);

		return hashSync(valueWithPepper, salt);
	}

	static compare(value: string, hashedValue: string): boolean {
		const pepper = bcrypt.pepper;

		const valueWithPepper = value.concat(pepper);

		return compareSync(valueWithPepper, hashedValue);
	}
}
