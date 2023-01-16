export abstract class EnumValueObject<Type> {
  readonly value: Type;

  constructor(value: Type, public readonly validValues: Array<Type>) {
    this.value = value;
    this.checkValueIsValid(value);
  }

  public checkValueIsValid(value: Type): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: Type): void;
}
