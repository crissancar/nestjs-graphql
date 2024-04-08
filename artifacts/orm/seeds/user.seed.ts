/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Bcrypt } from '../../../src/app/modules/shared/services/bcrypt.service';
import { Uuid } from '../../../src/app/modules/shared/services/uuid.service';
import { UserEntity } from '../../../src/app/modules/users/persistence/user.entity';
import { config } from '../../../src/config/app/index';

const { seeds } = config.typeorm;

export default class UserSeed implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		const id = Uuid.random();
		const name = seeds.name;
		const email = seeds.email;
		const password = Bcrypt.hash(seeds.password);
		const audiences = seeds.audiences;

		const userEntity = UserEntity.create(id, name, email, password, audiences);

		try {
			await dataSource.createEntityManager().save<UserEntity>(userEntity);
			console.log(' -> User created :)');
		} catch (error) {
			console.log(' -> data already exists :)');
		}
	}
}
