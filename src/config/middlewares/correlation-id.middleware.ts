import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { Uuid } from '../../app/modules/shared/services/uuid.service';

export const CORRELATION_ID_HEADER = 'X-Correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction): void {
		const id = Uuid.random();

		req[CORRELATION_ID_HEADER] = id;
		res.set(CORRELATION_ID_HEADER, id);

		next();
	}
}
