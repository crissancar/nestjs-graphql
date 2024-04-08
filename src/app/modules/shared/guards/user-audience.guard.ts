import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserEntity } from '../../users/persistence/user.entity';
import { userAudienceGuardConstants } from '../config/constants/user-audience-guard.constants';
import { UserAudiences } from '../enums/user-audiences.enum';
import { InvalidUserAudienceException } from '../exceptions/invalid-user-audience.exception';

const { context } = userAudienceGuardConstants;

@Injectable()
export class UserAudienceGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const validAudiences = this.reflector.get<Array<string>>('audiences', context.getHandler());

		const userAudiences = this.getUserAudiences(context);

		this.checkUserAudiences(userAudiences, validAudiences);

		return true;
	}

	private getUserAudiences(context: ExecutionContext): Array<UserAudiences> {
		const gqlExecutionContext = GqlExecutionContext.create(context);

		const request = gqlExecutionContext.getContext().req;

		const user = request.authUser as UserEntity;

		return user.audiences;
	}

	private checkUserAudiences(
		userAudiences: Array<UserAudiences>,
		validAudiences: Array<string>,
	): void {
		if (!this.areValidAudiences(userAudiences, validAudiences)) {
			throw new InvalidUserAudienceException(context);
		}
	}

	private areValidAudiences(
		userAudiences: Array<UserAudiences>,
		validAudiences: Array<string>,
	): boolean {
		const result = userAudiences.map((audience) => validAudiences.includes(audience));

		return !result.includes(false);
	}
}
