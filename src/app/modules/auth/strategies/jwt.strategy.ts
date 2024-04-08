import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { config } from '../../../../config/app/index';
import { SelectOptions } from '../../shared/decorators/select-options.decorator';
import { FindUserRequest } from '../../users/dtos/find-user-request.dto';
import { UserEntity } from '../../users/persistence/user.entity';
import { UserFinder } from '../../users/services/user-finder.service';
import { authConfig } from '../config/auth.config';
import { Payload } from '../interfaces/token.interface';

const { jwt } = config;
const { jwtStrategy } = authConfig;
const { strategyName } = jwtStrategy.constants;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, strategyName) {
	constructor(private readonly userFinder: UserFinder) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwt.secret,
		});
	}

	async validate(jwtPayload: Payload): Promise<UserEntity> {
		const { sub: id } = jwtPayload;
		const selectOptions = { columns: ['audiences'] } as SelectOptions<UserEntity>;
		const request = FindUserRequest.create('id', id, selectOptions);

		return this.userFinder.run(request);
	}
}
