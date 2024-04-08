import { applyDecorators, UseGuards } from '@nestjs/common';

import { AllowedAudiences } from '../../shared/decorators/allowed-audiences.decorator';
import { ApiKeyGuard } from '../../shared/guards/api-key.guard';
import { ApiKeyAudienceGuard } from '../../shared/guards/api-key-audience.guard';
import { LocalGuard } from '../guards/local.guard';

export const LoginAuthentication = (...audiences: Array<string>): MethodDecorator =>
	applyDecorators(
		UseGuards(ApiKeyGuard, ApiKeyAudienceGuard, LocalGuard),
		AllowedAudiences(...audiences),
	);
