import { Command } from '../classes';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}
