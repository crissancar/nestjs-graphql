import { FindOptionsWhere } from 'typeorm';

import { SortColumn } from '../types/sort-column.type';
import { SortOrder } from '../types/sort-order.type';

export interface CriteriaQuery<T> {
	where: FindOptionsWhere<T>;
	take: number;
	page: number;
	skip: number;
	sortColumn: SortColumn<T>;
	sortOrder: SortOrder;
}
