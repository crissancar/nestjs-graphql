export class AuthenticateApiKeyRequest {
	readonly key: string;

	constructor(key: string) {
		this.key = key;
	}

	static create(apiKey: string): AuthenticateApiKeyRequest {
		return new AuthenticateApiKeyRequest(apiKey);
	}
}
