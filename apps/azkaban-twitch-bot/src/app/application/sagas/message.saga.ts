import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { MessageEvent } from '../events/impl';
import { CreateMessageCommand } from '../commands/impl/createMessage.command';

@Injectable()
export class MessageSaga {
  @Saga()
  createMessage = (
    event$: Observable<MessageEvent>
  ): Observable<CreateMessageCommand> => {
    return event$.pipe(
      ofType(MessageEvent),
      map((event) => {
        return new CreateMessageCommand(
          event.channelId,
          event.userId,
          event.messageId,
          event.channel,
          event.username,
          event.message,
          event.messageColor
        );
      })
    );
  };
}
