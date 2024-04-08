import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { UserEntity } from '../persistence/user.entity';
import { UserCriteriaQuery } from '../persistence/user-criteria.query';

export class FindUsersByCriteriaResponse {
	readonly data: Array<UserEntity>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;

	constructor(
		data: Array<UserEntity>,
		count: number,
		currentCount: number,
		take: number,
		page: number,
	) {
		this.data = data;
		this.count = count;
		this.currentCount = currentCount;
		this.take = take;
		this.page = page;
	}

	static create(
		query: UserCriteriaQuery,
		criteriaResult: CriteriaResult<UserEntity>,
	): FindUsersByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = query;
		const currentCount = data.length;

		return new FindUsersByCriteriaResponse(data, count, currentCount, take, page);
	}
}
