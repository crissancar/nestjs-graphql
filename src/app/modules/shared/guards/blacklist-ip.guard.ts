import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { BlacklistIPChecker } from '../../blacklists/ip/services/blacklist-ip-checker.service';

@Injectable()
export class BlacklistIPGuard implements CanActivate {
	constructor(private readonly checker: BlacklistIPChecker) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		const ip = String(request.headers['x-forwarded-for']);

		await this.checker.run(ip);

		return true;
	}
}
