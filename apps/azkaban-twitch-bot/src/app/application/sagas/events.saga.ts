import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { FollowerEvent } from '../events/impl/follower.event';
import { CreateFollowerCommand } from '../commands/impl/createFollower.command';

@Injectable()
export class EventsSaga {
  @Saga()
  createFollowerEvent = (
    events$: Observable<FollowerEvent>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(FollowerEvent),
      map(
        (event) =>
          new CreateFollowerCommand(
            event.channelId,
            event.followerId,
            event.date
          )
      )
    );
  };
}
