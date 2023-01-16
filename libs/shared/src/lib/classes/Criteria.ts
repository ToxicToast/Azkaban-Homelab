import { Optional } from '../types';

export class Criteria {
  readonly filters: any; // TODO: Filters
  readonly order: any; // TODO: Order
  readonly limit?: Optional<number>;
  readonly offset?: Optional<number>;

  constructor(
    filters: any,
    order: any,
    limit?: Optional<number>,
    offset?: Optional<number>
  ) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }
}
