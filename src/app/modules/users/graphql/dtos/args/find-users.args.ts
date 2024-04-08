import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ValidatePage } from '../../../../shared/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../../../shared/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../../../shared/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../../../shared/decorators/validate-take.decorator';
import { SortColumn } from '../../../../shared/types/sort-column.type';
import { SortOrder } from '../../../../shared/types/sort-order.type';
import { UserEntity } from '../../../persistence/user.entity';

@ArgsType()
export class FindUsersArgs {
	@Field(() => String, { nullable: true, description: 'The user name' })
	@IsOptional()
	@IsString()
	name?: string;

	@Field(() => String, { nullable: true, description: 'The user email' })
	@IsOptional()
	@IsEmail()
	email?: string;

	@Field(() => String, { nullable: true, description: 'The keyword to search by like' })
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	keyword?: string;

	@Field(() => String, { nullable: true, description: 'The column name to sort' })
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	sortName?: string;

	@Field(() => String, { nullable: true, description: 'The column to order sort' })
	@ValidateSortColumn(UserEntity)
	sortColumn?: SortColumn<UserEntity>;

	@Field(() => String, { nullable: true, description: 'The order to sort' })
	@ValidateSortOrder()
	sortOrder?: SortOrder;

	@Field(() => Number, { nullable: true, description: 'The number of items to take' })
	@ValidateTake()
	take?: number;

	@Field(() => Number, { nullable: true, description: 'The number of page to list' })
	@ValidatePage()
	page?: number;
}
