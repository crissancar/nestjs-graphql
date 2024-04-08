import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { apiKeysConfig } from './config/api-keys.config';
import { ApiKeyEntity } from './persistence/api-key.entity';
import { TypeOrmApiKeyRepository } from './persistence/typeorm-api-key.repository';
import { ApiKeyAuthenticator } from './services/api-key-authenticator.service';
import { ApiKeyFinder } from './services/api-key-finder.service';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

const { repositoryInterface } = apiKeysConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([ApiKeyEntity])],
	providers: [
		ApiKeyAuthenticator,
		ApiKeyFinder,
		ApiKeyStrategy,
		{ provide: repositoryInterface, useClass: TypeOrmApiKeyRepository },
	],
	exports: [ApiKeyFinder],
})
export class ApiKeysModule {}
