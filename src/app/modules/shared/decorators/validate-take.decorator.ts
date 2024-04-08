import { applyDecorators } from '@nestjs/common';
import { IsNumber, IsOptional, Min, ValidateIf } from 'class-validator';

import { TransformToNumber } from './transform-to-number.decorator';

export const ValidateTake = (): PropertyDecorator =>
	applyDecorators(
		IsOptional(),
		ValidateIf((object, value) => value !== undefined),
		TransformToNumber(),
		IsNumber(),
		Min(0),
	);
