import { createParamDecorator } from '@nestjs/common';

import { Uuid } from '../services/uuid.service';

export const UuidGenerator = createParamDecorator((): string => {
	return Uuid.random();
});
