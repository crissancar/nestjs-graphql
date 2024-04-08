import { Injectable } from '@nestjs/common';

import { CheckBlacklistUserRequest } from '../../blacklists/user/dtos/check-blacklist-user-request.dto';
import { BlacklistUserEntity } from '../../blacklists/user/persistence/blacklist-user.entity';
import { BlacklistUserChecker } from '../../blacklists/user/services/blacklist-user-checker.service';
import { SelectOptions } from '../../shared/decorators/select-options.decorator';
import { FindUserRequest } from '../../users/dtos/find-user-request.dto';
import { UserEntity } from '../../users/persistence/user.entity';
import { UserFinder } from '../../users/services/user-finder.service';
import { authConfig } from '../config/auth.config';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { LoginUserRequest } from '../dtos/login-user-request.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

const { authenticator } = authConfig;
const { context } = authenticator.constants;

@Injectable()
export class Authenticator {
	constructor(
		private readonly userFinder: UserFinder,
		private readonly blacklistUserChecker: BlacklistUserChecker,
	) {}

	async run(request: LoginUserRequest): Promise<AuthenticatedUser> {
		const user = await this.getUser(request.email);

		await this.checkUserBlocked(user);

		this.checkUserAuthentication(request, user);

		return AuthenticatedUser.create(user);
	}

	private async getUser(email: string): Promise<UserEntity> {
		const selectOptions = {
			columns: ['id', 'name', 'email', 'audiences', 'password'],
		} as SelectOptions<UserEntity>;
		const request = FindUserRequest.create('email', email, selectOptions);

		return this.userFinder.run(request);
	}

	private async checkUserBlocked(user: UserEntity): Promise<void> {
		const selectOptions = { columns: ['id'] } as SelectOptions<BlacklistUserEntity>;
		const request = CheckBlacklistUserRequest.create('userId', user.id, selectOptions);

		await this.blacklistUserChecker.run(request);
	}

	private checkUserAuthentication(request: LoginUserRequest, user: UserEntity): void {
		const { password: requestPassword } = request;
		const { password: userPassword } = user;

		if (!UserEntity.comparePasswords(requestPassword, userPassword)) {
			throw new InvalidCredentialsException(context);
		}
	}
}
