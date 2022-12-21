import { makeNotification } from "./factories/notification-factory"
import { ReadNotification } from "@domain/use-cases/read-notification"
import { NotificationNotFound } from "@domain/use-cases/errors/notification-not-found"
import { InMemoryNotificationRepository } from "./repositories/in-memory-notifications-repository"

type SutTypes = {
    sut: ReadNotification
    notificationsRepository: InMemoryNotificationRepository
}

const makeSut = (): SutTypes => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const sut = new ReadNotification(notificationsRepository);

    return {
        sut,
        notificationsRepository
    }
}

describe('ReadNotification', () => {
    it('should be able to cancel notification', async () => {
        const { sut, notificationsRepository } = makeSut()

        const notification = makeNotification()
        await notificationsRepository.create(notification)
        await sut.execute({ notificationId: notification.id })

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
    })

    it('should not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const sut = new ReadNotification(notificationsRepository)

        const promise = sut.execute({ notificationId: 'fake-notification-id' })

        await expect(promise).rejects.toThrowError(NotificationNotFound)
    })
})