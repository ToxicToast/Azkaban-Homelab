export interface Mapper<DomainType, EntityType> {
  domainToEntity(domain: DomainType): EntityType;
  entityToDomain(entity: EntityType): DomainType;
}
