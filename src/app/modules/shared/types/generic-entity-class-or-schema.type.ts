import { EntitySchema } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-types
export type GenericEntityClassOrSchema<T> = Function | EntitySchema<T>;
