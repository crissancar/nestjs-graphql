import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class FindUserArgs {
	@Field(() => ID, { description: 'The user id' })
	@IsUUID()
	id: string;
}
