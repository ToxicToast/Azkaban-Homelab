export interface Factory<AnemicType, DomainType, CreateType> {
  reconstitute(anemic: AnemicType): DomainType;
  constitute(domain: DomainType): AnemicType;
  createFactory(data: CreateType): DomainType;
}
