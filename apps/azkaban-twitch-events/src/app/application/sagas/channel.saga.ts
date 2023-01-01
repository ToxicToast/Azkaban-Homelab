import { Injectable, Logger } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { RaidedEvent, RaidEvent } from '../events/impl';
import { ofType, Saga } from '@nestjs/cqrs';

@Injectable()
export class ChannelSaga {
  @Saga()
  createNewRaid = (event$: Observable<RaidEvent>): Observable<void> => {
    return event$.pipe(
      ofType(RaidEvent),
      map((event) => {
        Logger.debug(
          {
            ...event,
          },
          'Create new Raid Command'
        );
      })
    );
  };

  @Saga()
  createNewRaided = (event$: Observable<RaidedEvent>): Observable<void> => {
    return event$.pipe(
      ofType(RaidedEvent),
      map((event) => {
        Logger.debug(
          {
            ...event,
          },
          'Create new Raided Command'
        );
      })
    );
  };
}
