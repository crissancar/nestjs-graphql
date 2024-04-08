import { Nullable } from '../../shared/types/nullable.type';
import { ApiKeyEntity } from '../persistence/api-key.entity';

export interface ApiKeyRepository {
	find(key: string): Promise<Nullable<ApiKeyEntity>>;
}
