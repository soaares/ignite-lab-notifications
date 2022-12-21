import { GetRecipientNotifications } from "@domain/use-cases/get-recipient-notifications"
import { makeNotification } from "./factories/notification-factory"
import { InMemoryNotificationRepository } from "./repositories/in-memory-notifications-repository"

type SutTypes = {
    sut: GetRecipientNotifications
    notificationsRepository: InMemoryNotificationRepository
}

const makeSut = (): SutTypes => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const sut = new GetRecipientNotifications(notificationsRepository);

    return {
        sut,
        notificationsRepository
    }
}

describe('GetRecipientNotifications', () => {
    it('should be able to get recipient notifications', async () => {
        const { sut, notificationsRepository } = makeSut()

        const notification = makeNotification()
        const notificationFakeId = makeNotification({ recipientId: 'fake-recipient-id' })

        await notificationsRepository.create(notification)
        await notificationsRepository.create(notification)
        await notificationsRepository.create(notificationFakeId)
        const { notifications } = await sut.execute({ recipientId: notification.recipientId })

        expect(notifications).toHaveLength(2)
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientId: 'any-recipient-id' }),
                expect.objectContaining({ recipientId: 'any-recipient-id' })
            ])
        )
    })

})