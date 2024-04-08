import { FindOptionsWhere, ILike } from 'typeorm';

import { SelectOptions } from '../../shared/decorators/select-options.decorator';
import { CriteriaQuery } from '../../shared/interfaces/criteria-query.interface';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria.request.dto';
import { UserEntity } from './user.entity';

export class UserCriteriaQuery implements CriteriaQuery<UserEntity> {
	readonly selectOptions: SelectOptions<UserEntity>;

	readonly where: FindOptionsWhere<UserEntity>;

	readonly name: string;

	readonly email: string;

	readonly take: number;

	readonly page: number;

	readonly skip: number;

	readonly sortName: string;

	readonly sortColumn: SortColumn<UserEntity>;

	readonly sortOrder: SortOrder;

	constructor(
		selectOptions: SelectOptions<UserEntity>,
		where: FindOptionsWhere<UserEntity>,
		name: string,
		email: string,
		take: number,
		page: number,
		sortName: string,
		sortColumn: SortColumn<UserEntity>,
		sortOrder: SortOrder,
	) {
		this.selectOptions = selectOptions;
		this.where = where;
		this.name = name;
		this.email = email;
		this.take = take ?? 10;
		this.page = page ?? 1;
		this.skip = (this.page - 1) * this.take;
		this.sortName = sortName;
		this.sortColumn = sortColumn ?? 'createdAt';
		this.sortOrder = sortOrder ?? 'DESC';
	}

	static create(request: FindUsersByCriteriaRequest): UserCriteriaQuery {
		const { selectOptions, name, email, keyword, take, page, sortName, sortColumn, sortOrder } =
			request;

		const where = this.createFindOptionsWhere(name, email, keyword);

		return new UserCriteriaQuery(
			selectOptions,
			where,
			name,
			email,
			take,
			page,
			sortName,
			sortColumn,
			sortOrder,
		);
	}

	private static createFindOptionsWhere(
		name: string,
		email: string,
		keyword: string,
	): FindOptionsWhere<UserEntity> {
		return {
			...(name && { name }),
			...(email && { email }),
			...(keyword && { email: ILike(`%${keyword}%`) }),
		};
	}
}
