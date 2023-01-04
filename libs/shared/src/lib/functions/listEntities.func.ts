import { Domain, Mapper } from '../interfaces';
import { Repository as TypeRepository } from 'typeorm/repository/Repository';
import { Nullable } from '../types';

type MapperType = Mapper<unknown, unknown>;
type DomainType = Domain<unknown>;
type RepositoryType = TypeRepository<unknown>;

export async function ListEntitiesFunc<
  Mapper extends MapperType,
  Domain extends DomainType,
  Repository extends RepositoryType,
  EntityType
>(repository: Repository, mapper: Mapper): Promise<Nullable<Array<Domain>>> {
  try {
    const entities = await repository.find({
      withDeleted: false,
      order: {
        created_at: 'DESC',
      },
    });
    return entities.length
      ? (entities.map((entity: EntityType) =>
          mapper.entityToDomain(entity)
        ) as Array<Domain>)
      : null;
  } catch (e) {
    return null;
  }
}
