// import { SelectOptions } from '../../shared/decorators/select-options.decorator';
// import { FindByOptions } from '../../shared/types/find-by-options.type';
// import { UserEntity } from '../persistence/user.entity';

// export class FindRawUserRequest {
// 	readonly options: FindByOptions<UserEntity>;

// 	constructor(options: FindByOptions<UserEntity>) {
// 		this.options = options;
// 	}

// 	static create(
// 		key: keyof UserEntity,
// 		value: string,
// 		selectOptions: SelectOptions<UserEntity>,
// 	): FindRawUserRequest {
// 		const { columns } = selectOptions;
// 		const options = { key, value, columns } as FindByOptions<UserEntity>;

// 		return new FindRawUserRequest(options);
// 	}
// }
