import { Body, Controller, Post, Patch, Param, Get } from '@nestjs/common';
import { SendNotification } from '@domain/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel, NotificationViewModelProps } from '../view-models/notification-view-model';
import { CancelNotification } from '@domain/use-cases/cancel-notification';
import { ReadNotification } from '@domain/use-cases/read-notification';
import { UnreadNotification } from '@domain/use-cases/unread-notification';
import { CountRecipientNotifications } from '@domain/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@domain/use-cases/get-recipient-notifications';

@Controller()
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({ notificationId })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise<number> {
    const { count } = await this.countRecipientNotifications.execute({ recipientId })
    return count
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string): Promise<NotificationViewModelProps[]> {
    const { notifications } = await this.getRecipientNotifications.execute({ recipientId })
    return notifications.map(notification => NotificationViewModel.toHTTP(notification))
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({ notificationId })
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    await this.unreadNotification.execute({ notificationId })
  }

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
