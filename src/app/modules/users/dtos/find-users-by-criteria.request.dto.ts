import { SelectOptions } from '../../shared/decorators/select-options.decorator';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { UserEntity } from '../persistence/user.entity';

export class FindUsersByCriteriaRequest {
	readonly selectOptions: SelectOptions<UserEntity>;

	readonly name?: string;

	readonly email?: string;

	readonly keyword?: string;

	readonly sortName?: string;

	readonly sortColumn?: SortColumn<UserEntity>;

	readonly sortOrder?: SortOrder;

	readonly take?: number;

	readonly page?: number;
}
