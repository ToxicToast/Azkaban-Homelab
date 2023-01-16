import { ValueObject } from './ValueObject';
import { v4 as uuid, validate } from 'uuid';
import { InvalidArgumentError } from '../errors';

export class UuidValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${id}>`
      );
    }
  }

  static random(): UuidValueObject {
    return new UuidValueObject(uuid());
  }
}
