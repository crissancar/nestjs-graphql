import { applyDecorators, SetMetadata } from '@nestjs/common';

export const AllowedAudiences = (...audiences: Array<string>): MethodDecorator => {
	return applyDecorators(SetMetadata('audiences', audiences));
};
