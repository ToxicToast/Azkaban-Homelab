import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { OfflineEvent, OnlineEvent } from '../events/impl';

@Injectable()
export class StreamSaga {
  @Saga()
  updateStreamOnline = (event$: Observable<OnlineEvent>): Observable<void> => {
    return event$.pipe(
      ofType(OnlineEvent),
      map((event) => {
        Logger.debug(
          {
            ...event,
          },
          'Update Stream to Online Command'
        );
      })
    );
  };

  @Saga()
  updateStreamOffline = (
    event$: Observable<OfflineEvent>
  ): Observable<void> => {
    return event$.pipe(
      ofType(OfflineEvent),
      map((event) => {
        Logger.debug(
          {
            ...event,
          },
          'Update Stream to Offline Command'
        );
      })
    );
  };
}
