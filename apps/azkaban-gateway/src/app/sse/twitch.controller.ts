import { Body, Controller, Logger, Post, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('sse/twitch')
export class TwitchController {
  @Post()
  postedEvents(@Body() body): void {
    Logger.debug({ ...body }, TwitchController.name);
  }
}
