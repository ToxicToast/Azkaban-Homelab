import { Either } from './Either';

export type Nullable<Type> = Either<Type, null>;
