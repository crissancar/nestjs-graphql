import { applyDecorators, UseGuards } from '@nestjs/common';

import { ResourceExists } from '../guards/resource-exists.guard';
import { ResourceType } from './resource-type.decorator';

export const ResourceCheck = (resource: string): MethodDecorator =>
	applyDecorators(UseGuards(ResourceExists), ResourceType(resource));
