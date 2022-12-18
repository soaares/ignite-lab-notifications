import { Notification } from "../domain/entities/notification"
import { SendNotification } from "../domain/use-cases/send-notification"
import { InMemoryNotificationRepository } from "./repositories/in-memory-notifications-repository"

describe('SendNotification', () => {
    it('should be able to send notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository()
        const sendNotification = new SendNotification(notificationsRepository);

        const { notification } = await sendNotification.execute({
            content: 'This is a notification',
            category: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notificationsRepository.notifications).toHaveLength(1)
        expect(notificationsRepository.notifications[0]).toEqual(notification)
    })
})