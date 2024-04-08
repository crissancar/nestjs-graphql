import { SelectOptions } from '../../../shared/decorators/select-options.decorator';
import { FindByOptions } from '../../../shared/types/find-by-options.type';
import { BlacklistUserEntity } from '../persistence/blacklist-user.entity';

export class CheckBlacklistUserRequest {
	readonly options: FindByOptions<BlacklistUserEntity>;

	constructor(options: FindByOptions<BlacklistUserEntity>) {
		this.options = options;
	}

	static create(
		key: keyof BlacklistUserEntity,
		value: string,
		selectOptions: SelectOptions<BlacklistUserEntity>,
	): CheckBlacklistUserRequest {
		const options = { key, value, selectOptions } as FindByOptions<BlacklistUserEntity>;

		return new CheckBlacklistUserRequest(options);
	}
}
