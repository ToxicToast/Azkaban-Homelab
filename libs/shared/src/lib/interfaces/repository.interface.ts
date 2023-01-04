import { Nullable } from '../types';

export interface Repository<DomainType> {
  save(domain: DomainType): Promise<void>;
  findList(): Promise<Nullable<Array<DomainType>>>;
  findById(id: string): Promise<Nullable<DomainType>>;
}
