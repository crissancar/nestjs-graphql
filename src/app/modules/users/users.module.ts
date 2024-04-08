import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { usersConfig } from './config/users.config';
import { UserMutationResolver } from './graphql/resolvers/user-mutation.resolver';
import { UserQueryResolver } from './graphql/resolvers/user-query.resolver';
import { TypeOrmUserRepository } from './persistence/typeorm-user.repository';
import { UserEntity } from './persistence/user.entity';
import { UserEntitySubscriber } from './persistence/user-entity.subscriber';
import { UserCreator } from './services/user-creator.service';
import { UserFinder } from './services/user-finder.service';
import { UserUpdater } from './services/user-updater.service';
import { UsersFinderByCriteria } from './services/users-finder-by-criteria.service';

const { repositoryInterface } = usersConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [
		UserQueryResolver,
		UserMutationResolver,
		UserCreator,
		UserEntitySubscriber,
		UserFinder,
		UsersFinderByCriteria,
		UserUpdater,
		{ provide: repositoryInterface, useClass: TypeOrmUserRepository },
	],
	exports: [UserFinder],
})
export class UsersModule {}
