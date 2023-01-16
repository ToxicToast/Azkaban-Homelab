import { Command } from '../classes';

export interface CommandHandler<Type extends Command> {
  subscribedTo(): Command;
  handle(command: Type): Promise<void>;
}
