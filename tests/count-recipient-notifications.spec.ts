import { CountRecipientNotifications } from "@domain/use-cases/count-recipient-notifications"
import { makeNotification } from "./factories/notification-factory"
import { InMemoryNotificationRepository } from "./repositories/in-memory-notifications-repository"

export type SutTypes = {
    sut: CountRecipientNotifications
    notificationsRepository: InMemoryNotificationRepository
}

export const makeSut = (): SutTypes => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const sut = new CountRecipientNotifications(notificationsRepository);

    return {
        sut,
        notificationsRepository
    }
}

describe('CountRecipientNotifications', () => {
    it('should be able to count recipient notifications', async () => {
        const { sut, notificationsRepository } = makeSut()

        const notification = makeNotification()
        const notificationFakeId = makeNotification({ recipientId: 'fake-recipient-id' })

        await notificationsRepository.create(notification)
        await notificationsRepository.create(notification)
        await notificationsRepository.create(notificationFakeId)
        const recipientNotifications = await sut.execute({ recipientId: notification.recipientId })

        expect(recipientNotifications.count).toEqual(2)
    })

})