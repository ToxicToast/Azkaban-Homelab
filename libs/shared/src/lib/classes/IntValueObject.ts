import { ValueObject } from './ValueObject';

export abstract class NumberValueObject extends ValueObject<number> {
  isBiggerThan(value: NumberValueObject): boolean {
    return this.value > value.value;
  }
}
