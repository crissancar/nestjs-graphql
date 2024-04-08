import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TimestampType {
	@Field({ description: 'Timestamp when the record was created' })
	createdAt: Date;

	@Field({ description: 'Timestamp when the record was last updated' })
	updatedAt: Date;

	@Field({ description: 'Timestamp when the record was deleted' })
	deletedAt: Date;
}
