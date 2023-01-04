export interface Domain<AnemicType> {
  isUpdated(): boolean;
  isDeleted(): boolean;
  isActive(): boolean;
  toAnemic(): AnemicType;
  create(): void;
  delete(): void;
  restore(): void;
  deactivate(): void;
  activate(): void;
}
