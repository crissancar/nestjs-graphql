import { FindOptionsWhere } from 'typeorm';

import { TypeOrmRepository } from '../../../shared/persistence/typeorm.repository';
import { FindByOptions } from '../../../shared/types/find-by-options.type';
import { GenericEntityClassOrSchema } from '../../../shared/types/generic-entity-class-or-schema.type';
import { BlacklistUserRepository } from '../repositories/blacklist-user.repository';
import { BlacklistUserEntity } from './blacklist-user.entity';

export class TypeOrmBlacklistUserRepository
	extends TypeOrmRepository<BlacklistUserEntity>
	implements BlacklistUserRepository
{
	async findBy(options: FindByOptions<BlacklistUserEntity>): Promise<BlacklistUserEntity> {
		const { key, value, selectOptions } = options;
		const { columns } = selectOptions;
		const where = { [key]: value } as FindOptionsWhere<BlacklistUserEntity>;

		const builder = this.createTypeOrmQueryBuilder();
		builder.select(columns);
		builder.where(where);

		return builder.executeGetOne();
	}

	protected entitySchema(): GenericEntityClassOrSchema<BlacklistUserEntity> {
		return BlacklistUserEntity;
	}
}
