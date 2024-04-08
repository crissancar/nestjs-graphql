import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput {
	@Field(() => ID, { description: 'The user id' })
	@IsUUID()
	id: string;

	@Field(() => String, { nullable: true, description: 'The user name' })
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	name?: string;

	@Field(() => String, { nullable: true, description: 'The user email' })
	@IsOptional()
	@IsEmail()
	email?: string;
}
