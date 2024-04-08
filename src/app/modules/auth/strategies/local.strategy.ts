import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { ClassValidator } from '../../shared/services/class-validator.service';
import { authConfig } from '../config/auth.config';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { LoginInput } from '../graphql/dtos/inputs/login.input';
import { Authenticator } from '../services/authenticator.service';

const { localStrategy } = authConfig;
const { strategyFields } = localStrategy.constants;
const { email, password } = strategyFields;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authenticator: Authenticator) {
		super({
			usernameField: email,
			passwordField: password,
		});
	}

	async validate(email: string, password: string): Promise<AuthenticatedUser> {
		const request = LoginInput.create(email, password);
		await ClassValidator.run(request);

		return this.authenticator.run({ email, password });
	}
}
