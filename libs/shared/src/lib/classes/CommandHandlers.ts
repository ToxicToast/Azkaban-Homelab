import { Command } from './Command';
import { CommandHandler } from '../interfaces';
import { CommandNotRegisteredError } from '../errors';

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    super();
    commandHandlers.forEach((commandHandler: CommandHandler<Command>) => {
      this.set(commandHandler.subscribedTo(), commandHandler);
    });
  }

  public get(command: Command): CommandHandler<Command> {
    const commandHandler = super.get(command.constructor);
    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }
    return commandHandler;
  }
}
