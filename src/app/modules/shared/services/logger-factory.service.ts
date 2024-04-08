import { Logger } from '@nestjs/common';

export class LoggerFactory {
	static create(type: string): Logger {
		return new Logger(type);
	}
}
