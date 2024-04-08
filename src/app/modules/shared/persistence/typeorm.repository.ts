import { InjectDataSource } from '@nestjs/typeorm';
import {
	DataSource,
	DeepPartial,
	DeleteResult,
	FindOneOptions,
	Repository,
	SelectQueryBuilder,
	UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { TypeOrmQueryBuilder } from '../services/typeorm-query-builder.service';
import { GenericEntityClassOrSchema } from '../types/generic-entity-class-or-schema.type';

interface QueryBuilder<T> {
	queryBuilder: SelectQueryBuilder<T>;
	alias: string;
}

export abstract class TypeOrmRepository<T> {
	constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

	protected abstract entitySchema(): GenericEntityClassOrSchema<T>;

	protected async persistEntity(data: T, dto?: DeepPartial<T>): Promise<T> {
		const repository = this.repository();

		if (dto) {
			return this.updateEntity(data, dto);
		}

		return repository.save(data);
	}

	protected async persistPartialEntity(
		id: string,
		partialEntity: QueryDeepPartialEntity<T>,
	): Promise<UpdateResult> {
		const repository = this.repository();

		return repository.update(id, partialEntity);
	}

	protected async findOneEntity(options: FindOneOptions<T>): Promise<T> {
		const repository = this.repository();

		return repository.findOne(options);
	}

	protected async deleteEntity(id: string): Promise<DeleteResult> {
		const repository = this.repository();

		return repository.delete(id);
	}

	protected async softDeleteEntity(id: string): Promise<UpdateResult> {
		const repository = this.repository();

		return repository.softDelete(id);
	}

	protected async resolveRelationEntity<RelationEntity>(
		relationEntitySchema: GenericEntityClassOrSchema<RelationEntity>,
		options: FindOneOptions<RelationEntity>,
	): Promise<RelationEntity> {
		const relationRepository = this.dataSource.getRepository(relationEntitySchema);

		return relationRepository.findOne(options);
	}

	protected createQueryBuilder(): QueryBuilder<T> {
		const repository = this.repository();

		const alias = repository.metadata.tableName;

		const queryBuilder = repository.createQueryBuilder(alias);

		return { queryBuilder, alias };
	}

	protected createTypeOrmQueryBuilder(): TypeOrmQueryBuilder<T> {
		const repository = this.repository();

		const alias = repository.metadata.tableName;

		const queryBuilder = repository.createQueryBuilder(alias);

		return new TypeOrmQueryBuilder<T>(queryBuilder, alias);
	}

	private async updateEntity(data: T, dto: DeepPartial<T>): Promise<T> {
		const repository = this.repository();

		const updatedEntity = repository.merge(data, dto);

		return repository.save(updatedEntity);
	}

	private repository(): Repository<T> {
		return this.dataSource.getRepository(this.entitySchema());
	}
}
