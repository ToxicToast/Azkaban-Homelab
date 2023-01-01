import { Domain, Mapper, Nullable } from '@azkaban/shared';
import { Repository as TypeRepository } from 'typeorm/repository/Repository';

type MapperType = Mapper<unknown, unknown>;
type DomainType = Domain<unknown>;
type RepositoryType = TypeRepository<unknown>;

export async function SingleEntityFunc<
  Mapper extends MapperType,
  Domain extends DomainType,
  Repository extends RepositoryType,
  EntityType,
  ConditionType
>(
  repository: Repository,
  mapper: Mapper,
  condition: ConditionType
): Promise<Nullable<Domain>> {
  const entity = await repository.findOne({
    where: condition,
    withDeleted: false,
  });
  return entity ? (mapper.entityToDomain(entity) as Domain) : null;
}
