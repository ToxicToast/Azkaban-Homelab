import { Query } from './Query';
import { QueryHandler, Response } from '../interfaces';
import { QueryNotRegisteredError } from '../errors';

export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    super();
    queryHandlers.forEach((queryHandler: QueryHandler<Query, Response>) => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor);
    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }
    return queryHandler;
  }
}
