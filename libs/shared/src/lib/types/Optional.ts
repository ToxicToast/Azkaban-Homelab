import { Either } from './Either';

export type Optional<Type> = Either<Type, undefined>;
