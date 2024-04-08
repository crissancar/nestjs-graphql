import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
	@Field({ description: 'The user email' })
	@IsEmail()
	email: string;

	@Field({ description: 'The user password' })
	@IsString()
	@MinLength(8)
	password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}

	static create(email: string, password: string): LoginInput {
		return new LoginInput(email, password);
	}
}
