import { NodeOptions } from '@sentry/node';

import packageJson from '../../../package.json';
import { config } from '../app/index';

const { sentry, environment } = config;

export class SentryConfig {
	static run(): NodeOptions {
		return {
			debug: sentry.debug,
			enabled: sentry.enabled,
			dsn: sentry.dsn,
			environment,
			release: packageJson.version,
			normalizeDepth: 10,
		};
	}
}
