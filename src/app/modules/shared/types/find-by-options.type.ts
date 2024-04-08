import { SelectOptions } from '../decorators/select-options.decorator';

export interface FindByOptions<T> {
	key: keyof T;
	value: T[keyof T];
	selectOptions: SelectOptions<T>;
}
