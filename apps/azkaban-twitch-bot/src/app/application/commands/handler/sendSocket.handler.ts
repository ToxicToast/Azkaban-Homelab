import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendSocketCommand } from '../impl';
import { HttpService } from '@nestjs/axios';
import { environment } from '../../../../environments/environment';
import { Logger } from '@nestjs/common';

@CommandHandler(SendSocketCommand)
export class SendSocketHandler implements ICommandHandler<SendSocketCommand> {
  constructor(private readonly httpService: HttpService) {}
  async execute(command: SendSocketCommand): Promise<void> {
    const { type, data } = command;
    const { host, port } = environment.gateway;
    await this.httpService
      .post(`${host}:${port}/api/sse/twitch`, { type, data })
      .toPromise()
      .catch((error) => Logger.error(error));
  }
}
