import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { SendNotification } from '@domain/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@domain/use-cases/cancel-notification';

@Controller()
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({ notificationId })
  }

  async countFromRecipient() { }

  async getFromRecipient() { }

  async read() { }

  async unread() { }

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
