import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { ec as EC } from 'elliptic';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { config } from '../../../../config/app/index';
import { signatureGuardConstants } from '../config/constants/signature-guard.constants';
import { InvalidSignatureException } from '../exceptions/invalid-signature.exception';
import { LoggerFactory } from '../services/logger-factory.service';

const { publicKey } = config.client.signature;
const { context } = signatureGuardConstants;

const logger = LoggerFactory.create(context);

@Injectable()
export class SignatureGuard implements CanActivate {
	canActivate(
		executionContext: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const request = executionContext.switchToHttp().getRequest<Request>();

			const message = this.createMessage(request);

			return this.checkSignature(request, message);
		} catch (error) {
			logger.error(error);

			throw new InvalidSignatureException(context);
		}
	}

	private createMessage(request: Request): string {
		const { headers, body, originalUrl } = request;
		const { host, nonce } = headers;
		const protocol = String(headers['x-forwarded-proto']);

		const url = `${protocol}://${host}${originalUrl}`;

		const sha256 = createHash('sha256');

		const hash = sha256
			.update(`${nonce}${JSON.stringify(body)}`)
			.digest()
			.toString('base64');

		return `${url}${hash}`;
	}

	private checkSignature(request: Request, hash: string): boolean {
		const { headers } = request;
		const signature = String(headers.signature);

		const curve = new EC('secp256k1');
		const publicKeyPair = curve.keyFromPublic(publicKey, 'hex');

		const isValid = !!publicKeyPair.verify(hash, signature);

		if (!isValid) {
			throw new InvalidSignatureException(context);
		}

		return true;
	}
}
