import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from './logger-factory.service';

enum CODE {
	UNIQUE = '23505',
}

enum ROUTINE {
	UNIQUE = '_bt_check_unique',
}

interface DriverError {
	code: CODE;
	routine: ROUTINE;
}

const logger = LoggerFactory.create('TypeOrmError');

export class TypeOrmError {
	static isUnique(error: QueryFailedError): boolean {
		if (!error.driverError) {
			return false;
		}

		this.showLog(error);

		const driverError = error.driverError as unknown as DriverError;

		return driverError.code === CODE.UNIQUE && driverError.routine === ROUTINE.UNIQUE;
	}

	private static showLog(error: QueryFailedError): void {
		const { message, query } = error;

		logger.error({ error: { message, query } }, 'TypeOrm response');
	}
}
