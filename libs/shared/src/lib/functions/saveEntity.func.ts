import { Domain, Mapper } from '@azkaban/shared';
import { Repository as TypeRepository } from 'typeorm/repository/Repository';

type MapperType = Mapper<any, any>;
type DomainType = Domain<any>;
type RepositoryType = TypeRepository<any>;

export async function SaveEntityFunc<
  Mapper extends MapperType,
  Domain extends DomainType,
  Repository extends RepositoryType
>(mapper: Mapper, domain: Domain, repository: Repository): Promise<void> {
  const entity = mapper.domainToEntity(domain);
  await repository.save(entity);
}
