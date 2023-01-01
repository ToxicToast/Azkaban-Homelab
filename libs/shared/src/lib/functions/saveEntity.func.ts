import { Domain, Mapper } from '../interfaces';
import { Repository as TypeRepository } from 'typeorm/repository/Repository';

type MapperType = Mapper<unknown, unknown>;
type DomainType = Domain<unknown>;
type RepositoryType = TypeRepository<unknown>;

export async function SaveEntityFunc<
  Mapper extends MapperType,
  Domain extends DomainType,
  Repository extends RepositoryType
>(mapper: Mapper, domain: Domain, repository: Repository): Promise<void> {
  const entity = mapper.domainToEntity(domain);
  await repository.save(entity);
}
