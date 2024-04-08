import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../guards/jwt.guard';
import { UserAudienceGuard } from '../guards/user-audience.guard';
import { AllowedAudiences } from './allowed-audiences.decorator';

export const EndpointJWTAuthentication = (...audiences: Array<string>): MethodDecorator =>
	applyDecorators(UseGuards(JwtGuard, UserAudienceGuard), AllowedAudiences(...audiences));
