import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { SendNotification } from '@domain/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@domain/use-cases/cancel-notification';
import { ReadNotification } from '@domain/use-cases/read-notification';

@Controller()
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({ notificationId })
  }

  async countFromRecipient() { }

  async getFromRecipient() { }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({ notificationId })
  }

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
