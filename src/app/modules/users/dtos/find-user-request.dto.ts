import { SelectOptions } from '../../shared/decorators/select-options.decorator';
import { FindByOptions } from '../../shared/types/find-by-options.type';
import { UserEntity } from '../persistence/user.entity';

export class FindUserRequest {
	readonly options: FindByOptions<UserEntity>;

	constructor(options: FindByOptions<UserEntity>) {
		this.options = options;
	}

	static create(
		key: keyof UserEntity,
		value: string,
		selectOptions: SelectOptions<UserEntity>,
	): FindUserRequest {
		const options = { key, value, selectOptions } as FindByOptions<UserEntity>;

		return new FindUserRequest(options);
	}
}
