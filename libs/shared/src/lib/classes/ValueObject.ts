import { Primitives } from '../types';
import { InvalidArgumentError } from '../errors';

export abstract class ValueObject<Type extends Primitives> {
  readonly value: Type;

  constructor(value: Type) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: Type): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError('Value must be defined');
    }
  }

  equals(value: ValueObject<Type>): boolean {
    return (
      value.constructor.name === this.constructor.name &&
      value.value === this.value
    );
  }

  toString(): string {
    return this.value.toString();
  }
}
