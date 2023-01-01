import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { FollowerEvent } from '../events/impl';

@Injectable()
export class ViewerSaga {
  @Saga()
  createNewFollower = (event$: Observable<FollowerEvent>): Observable<void> => {
    return event$.pipe(
      ofType(FollowerEvent),
      map((event) => {
        Logger.debug(
          {
            ...event,
          },
          'Create new Follower Command'
        );
      })
    );
  };
}
