import { FindOptionsWhere } from 'typeorm';

import { TypeOrmRepository } from '../../../shared/persistence/typeorm.repository';
import { FindByOptions } from '../../../shared/types/find-by-options.type';
import { GenericEntityClassOrSchema } from '../../../shared/types/generic-entity-class-or-schema.type';
import { BlacklistIPRepository } from '../repositories/blacklist-ip.repository';
import { BlacklistIPEntity } from './blacklist-ip.entity';

export class TypeOrmBlacklistIPRepository
	extends TypeOrmRepository<BlacklistIPEntity>
	implements BlacklistIPRepository
{
	async findBy(options: FindByOptions<BlacklistIPEntity>): Promise<BlacklistIPEntity> {
		const { key, value, selectOptions } = options;
		const { columns } = selectOptions;
		const where = { [key]: value } as FindOptionsWhere<BlacklistIPEntity>;

		const builder = this.createTypeOrmQueryBuilder();
		builder.select(columns);
		builder.where(where);

		return builder.executeGetOne();
	}

	protected entitySchema(): GenericEntityClassOrSchema<BlacklistIPEntity> {
		return BlacklistIPEntity;
	}
}
