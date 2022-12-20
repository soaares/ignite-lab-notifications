import { Body, Controller, Post } from '@nestjs/common';
import { Notification } from '@domain/entities/notification';
import { SendNotification } from '@domain/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post('notifications')
  async create(@Body() body: CreateNotificationBody): Promise<{ notification: Notification }> {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return { notification }
  }
}
