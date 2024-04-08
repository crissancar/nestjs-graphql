import { applyDecorators, SetMetadata } from '@nestjs/common';

export const ResourceType = (resource: string): MethodDecorator => {
	return applyDecorators(SetMetadata('resource', resource));
};
