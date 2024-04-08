import { SetMetadata } from '@nestjs/common';

export const Audiences = (...audiences: string[]): MethodDecorator =>
	SetMetadata('audiences', audiences);
