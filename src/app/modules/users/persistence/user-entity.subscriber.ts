import {
	DataSource,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	UpdateEvent,
} from 'typeorm';

import { Bcrypt } from '../../shared/services/bcrypt.service';
import { EntitySubscriberListenTo } from '../../shared/types/entity-subscriber-listen-to.type';
import { UserEntity } from './user.entity';

@EventSubscriber()
export class UserEntitySubscriber implements EntitySubscriberInterface<UserEntity> {
	constructor(private readonly dataSource: DataSource) {
		dataSource.subscribers.push(this);
	}

	listenTo(): EntitySubscriberListenTo {
		return UserEntity;
	}

	beforeInsert(event: InsertEvent<UserEntity>): void {
		const { entity } = event;

		entity.password = Bcrypt.hash(entity.password);
	}

	beforeUpdate(event: UpdateEvent<UserEntity>): void {
		const { databaseEntity } = event;
		const entity = event.entity as UserEntity;

		if (!entity.password) {
			return;
		}

		if (this.isNewPassword(entity.password, databaseEntity.password)) {
			entity.password = Bcrypt.hash(entity.password);
		} else {
			entity.password = databaseEntity.password;
		}
	}

	private isNewPassword(password: string, savedPassword: string): boolean {
		return !UserEntity.comparePasswords(password, savedPassword);
	}
}
