import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthenticateApiKeyRequest } from '../dtos/authenticate-api-key.request.dto';
import { AuthenticateApiKeyResponse } from '../dtos/authenticate-api-key.response.dto';
import { ApiKeyAuthenticator } from '../services/api-key-authenticator.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
	constructor(private readonly authenticator: ApiKeyAuthenticator) {
		super(
			{
				header: 'Authorization',
				prefix: 'ApiKey ',
			},
			false,
		);
	}

	async validate(apiKey: string): Promise<AuthenticateApiKeyResponse> {
		const request = AuthenticateApiKeyRequest.create(apiKey);

		return this.authenticator.run(request);
	}
}
