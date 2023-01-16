import { CommandBus } from '../interfaces';
import { CommandHandlers } from './CommandHandlers';
import { Command } from './Command';

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command);
    await handler.handle(command);
  }
}
