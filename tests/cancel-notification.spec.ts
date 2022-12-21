import { CancelNotification } from "@domain/use-cases/cancel-notification"
import { NotificationNotFound } from "@domain/use-cases/errors/notification-not-found"
import { makeNotification } from "./factories/notification-factory"
import { InMemoryNotificationRepository } from "./repositories/in-memory-notifications-repository"

describe('CancelNotification', () => {
    it('should be able to cancel notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository()
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = makeNotification()
        await notificationsRepository.create(notification)
        await cancelNotification.execute({ notificationId: notification.id })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
    })

    it('should not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationsRepository)

        const promise = cancelNotification.execute({ notificationId: 'fake-notification-id' })

        await expect(promise).rejects.toThrowError(NotificationNotFound)
    })
})