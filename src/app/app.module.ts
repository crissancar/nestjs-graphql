import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';

import { loggerConfig } from '../config/logger/logger.config';
import { CorrelationIdMiddleware } from '../config/middlewares/correlation-id.middleware';
import { typeOrmConfig } from '../config/orm/typeorm.config';
import { providersConfig } from './app.config';
import { AppController } from './app.controller';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlacklistsModule } from './modules/blacklists/blacklists.module';

@Module({
	imports: [
		LoggerModule.forRoot(loggerConfig),
		GraphQLModule.forRoot({
			debug: false,
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'artifacts/graphql/schema.gql'),
			sortSchema: true,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
			// path: 'docs/graphql',
			// useGlobalPrefix: true,
			formatError: (error: GraphQLError) => {
				const graphQLFormattedError: GraphQLFormattedError = {
					message: error.message,
					extensions: {
						status: error.extensions.status,
						type: error.extensions.type,
					},
				};

				return graphQLFormattedError;
			},
		}),
		TypeOrmModule.forRoot(typeOrmConfig),
		EventEmitterModule.forRoot(),
		ApiKeysModule,
		AuthModule,
		BlacklistsModule,
	],
	controllers: [AppController],
	providers: providersConfig,
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(CorrelationIdMiddleware).forRoutes('*');
	}
}
