import { FindByOptions } from '../../../shared/types/find-by-options.type';
import { Nullable } from '../../../shared/types/nullable.type';
import { BlacklistIPEntity } from '../persistence/blacklist-ip.entity';

export interface BlacklistIPRepository {
	findBy(options: FindByOptions<BlacklistIPEntity>): Promise<Nullable<BlacklistIPEntity>>;
}
