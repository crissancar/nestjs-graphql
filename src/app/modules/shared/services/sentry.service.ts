import * as SentryNode from '@sentry/node';
import { Extras, Primitive } from '@sentry/types';

interface Tags {
	[key: string]: Primitive;
}

interface ExceptionOptions<T> {
	exception: T;
	tags?: Tags;
	extras?: Extras;
}

interface MessageOptions {
	message: string;
	tags?: Tags;
	extras?: Extras;
}

export class Sentry {
	static sendException<T>(options: ExceptionOptions<T>): void {
		const { exception, extras, tags } = options;

		SentryNode.withScope((scope) => {
			scope.setTags(tags);
			scope.setExtras(extras);
			SentryNode.captureException(exception);
		});
	}

	static sendMessage(options: MessageOptions): void {
		const { message, extras, tags } = options;

		SentryNode.withScope((scope) => {
			scope.setTags(tags);
			scope.setExtras(extras);
			SentryNode.captureMessage(message);
		});
	}
}
