import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiKeysModule } from '../api-keys/api-keys.module';
import { BlacklistsModule } from '../blacklists/blacklists.module';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from './config/jwt.config';
import { AuthMutationResolver } from './graphql/resolvers/auth-mutation.resolver';
import { Authenticator } from './services/authenticator.service';
import { JwtCreator } from './services/jwt-creator.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		JwtModule.register(jwtConfig),
		ApiKeysModule,
		UsersModule,
		PassportModule,
		BlacklistsModule,
	],
	providers: [AuthMutationResolver, Authenticator, JwtCreator, JwtStrategy, LocalStrategy],
	exports: [JwtCreator],
})
export class AuthModule {}
