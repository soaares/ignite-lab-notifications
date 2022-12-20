import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@domain/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) { }

  @Post('notifications')
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return { notification: NotificationViewModel.toHTTP(notification) }
  }
}
