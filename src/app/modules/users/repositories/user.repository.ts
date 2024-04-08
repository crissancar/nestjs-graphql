import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { FindByOptions } from '../../shared/types/find-by-options.type';
import { Nullable } from '../../shared/types/nullable.type';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UserEntity } from '../persistence/user.entity';
import { UserCriteriaQuery } from '../persistence/user-criteria.query';

export interface UserRepository {
	create(user: UserEntity): Promise<UserEntity>;
	findBy(options: FindByOptions<UserEntity>): Promise<Nullable<UserEntity>>;
	findByCriteria(query: UserCriteriaQuery): Promise<CriteriaResult<UserEntity>>;
	softDelete(id: string): Promise<boolean>;
	update(id: string, request: UpdateUserRequest): Promise<UserEntity>;
}
