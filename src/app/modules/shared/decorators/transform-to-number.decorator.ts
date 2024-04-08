import { Transform } from 'class-transformer';

export const TransformToNumber = (): PropertyDecorator =>
	Transform(({ value }) => (value ? Number(value) : undefined));
