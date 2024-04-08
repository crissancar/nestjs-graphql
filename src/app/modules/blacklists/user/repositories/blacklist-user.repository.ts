import { FindByOptions } from '../../../shared/types/find-by-options.type';
import { Nullable } from '../../../shared/types/nullable.type';
import { BlacklistUserEntity } from '../persistence/blacklist-user.entity';

export interface BlacklistUserRepository {
	findBy(options: FindByOptions<BlacklistUserEntity>): Promise<Nullable<BlacklistUserEntity>>;
}
