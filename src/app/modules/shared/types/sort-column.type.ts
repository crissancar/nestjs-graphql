import { TimestampEntity } from '../persistence/timestamp.entity';

export type SortColumn<T> = keyof T | keyof TimestampEntity;
