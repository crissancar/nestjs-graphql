import { createCipheriv, createDecipheriv } from 'crypto';

import { config } from '../../../../config/app/index';

const { crypto } = config;
const { cipher: cipherConfig, decipher: decipherConfig } = crypto;

export class Crypto {
	private static readonly algorithm = crypto.algorithm;
	private static readonly key = crypto.key;
	private static readonly iv = crypto.iv;

	static cipher(value: string): string {
		const inputEncoding = cipherConfig.input.encoding;
		const outputEncoding = cipherConfig.output.encoding;

		const cipher = createCipheriv(this.algorithm, this.key, this.iv);

		return cipher.update(value, inputEncoding, outputEncoding).concat(cipher.final(outputEncoding));
	}

	static decipher(value: string): string {
		const inputEncoding = decipherConfig.input.encoding;
		const outputEncoding = decipherConfig.output.encoding;

		const decipher = createDecipheriv(this.algorithm, this.key, this.iv);

		return decipher
			.update(value, inputEncoding, outputEncoding)
			.concat(decipher.final(outputEncoding));
	}
}
