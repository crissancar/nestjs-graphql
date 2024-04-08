import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DataSource } from 'typeorm';

import { LoggerFactory } from '../services/logger-factory.service';

const logger = LoggerFactory.create('ResourceExistsGuard');

@Injectable()
export class ResourceExists implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly dataSource: DataSource,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const resourceType = this.reflector.get<string>('resource', context.getHandler());
		const gqlExecutionContext = GqlExecutionContext.create(context);
		const request = gqlExecutionContext.getContext().req;
		const id = request?.body?.variables?.input?.id as string;
		if (!id) {
			throw new BadRequestException('Failed getting resource id from request input');
		}

		try {
			const repository = this.dataSource.getRepository(resourceType);
			const options = { where: { id } };
			const foundResource = await repository.findOne(options);
			if (!foundResource) {
				throw new BadRequestException('Resource not found');
			}
		} catch (error) {
			logger.error(error);
			throw error;
		}

		return true;
	}
}
