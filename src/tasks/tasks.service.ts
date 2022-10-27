import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 53 16 * * *') // 每周一上午 10 点
  handleWeek() {
    this.logger.debug('Called when the second is 16:53');
  }
}
