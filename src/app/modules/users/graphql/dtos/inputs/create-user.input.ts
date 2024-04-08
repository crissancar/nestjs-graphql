import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field(() => String, { description: 'The user name' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@Field(() => String, { description: 'The user email' })
	@IsEmail()
	email: string;

	@Field(() => String, { description: 'The user strong password' })
	@IsNotEmpty()
	@IsString()
	password: string;
}
