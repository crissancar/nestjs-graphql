import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity {
	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'now()',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'now()',
	})
	updatedAt: Date;

	@DeleteDateColumn({
		type: 'timestamp',
	})
	deletedAt: Date;
}
