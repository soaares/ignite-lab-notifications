import { makeNotification } from "./factories/notification-factory"
import { NotificationNotFound } from "@domain/use-cases/errors/notification-not-found"
import { InMemoryNotificationRepository } from "./repositories/in-memory-notifications-repository"
import { UnreadNotification } from "@domain/use-cases/unread-notification"

type SutTypes = {
    sut: UnreadNotification
    notificationsRepository: InMemoryNotificationRepository
}

const makeSut = (): SutTypes => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const sut = new UnreadNotification(notificationsRepository);

    return {
        sut,
        notificationsRepository
    }
}

describe('UnreadNotification', () => {
    it('should be able to unread a notification', async () => {
        const { sut, notificationsRepository } = makeSut()

        const notification = makeNotification({ readAt: new Date() })
        await notificationsRepository.create(notification)
        await sut.execute({ notificationId: notification.id })

        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    })

    it('should not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const sut = new UnreadNotification(notificationsRepository)

        const promise = sut.execute({ notificationId: 'fake-notification-id' })

        await expect(promise).rejects.toThrowError(NotificationNotFound)
    })
})