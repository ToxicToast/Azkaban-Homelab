import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import {
  ConnectEvent,
  DisconnectEvent,
  JoinEvent,
  MessageEvent,
  PartEvent,
} from '../events/impl';
import { SendSocketHandler } from '../commands/handler';
import { SendSocketCommand } from '../commands/impl';

@Injectable()
export class SocketSaga {
  @Saga()
  joinEvent = (event$: Observable<JoinEvent>): Observable<ICommand> => {
    return event$.pipe(
      ofType(JoinEvent),
      map((event) => {
        return new SendSocketCommand('join', event);
      })
    );
  };

  @Saga()
  partEvent = (event$: Observable<PartEvent>): Observable<ICommand> => {
    return event$.pipe(
      ofType(PartEvent),
      map((event) => {
        return new SendSocketCommand('part', event);
      })
    );
  };

  @Saga()
  messageEvent = (event$: Observable<MessageEvent>): Observable<ICommand> => {
    return event$.pipe(
      ofType(PartEvent),
      map((event) => {
        return new SendSocketCommand('message', event);
      })
    );
  };

  @Saga()
  connectEvent = (event$: Observable<ConnectEvent>): Observable<ICommand> => {
    return event$.pipe(
      ofType(ConnectEvent),
      map((event) => {
        return new SendSocketCommand('connect', event);
      })
    );
  };

  @Saga()
  disconnectEvent = (
    event$: Observable<DisconnectEvent>
  ): Observable<ICommand> => {
    return event$.pipe(
      ofType(DisconnectEvent),
      map((event) => {
        return new SendSocketCommand('disconnect', event);
      })
    );
  };
}
