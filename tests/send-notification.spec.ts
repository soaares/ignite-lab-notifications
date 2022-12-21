import { SendNotification } from "@domain/use-cases/send-notification"
import { InMemoryNotificationRepository } from "./repositories/in-memory-notifications-repository"

type SutTypes = {
    sut: SendNotification
    notificationsRepository: InMemoryNotificationRepository
}

const makeSut = (): SutTypes => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const sut = new SendNotification(notificationsRepository);

    return {
        sut,
        notificationsRepository
    }
}

describe('SendNotification', () => {
    it('should be able to send notification', async () => {
        const { sut, notificationsRepository } = makeSut()

        const { notification } = await sut.execute({
            content: 'This is a notification',
            category: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notificationsRepository.notifications).toHaveLength(1)
        expect(notificationsRepository.notifications[0]).toEqual(notification)
    })
})