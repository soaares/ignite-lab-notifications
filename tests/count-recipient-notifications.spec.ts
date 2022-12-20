import { Content } from "@domain/entities/content"
import { Notification } from "@domain/entities/notification"
import { CountRecipientNotifications } from "@domain/use-cases/count-recipient-notifications"
import { InMemoryNotificationRepository } from "./repositories/in-memory-notifications-repository"

type SutTypes = {
    sut: CountRecipientNotifications
    notificationsRepository: InMemoryNotificationRepository
}

const makeSut = (): SutTypes => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const sut = new CountRecipientNotifications(notificationsRepository);

    return {
        sut,
        notificationsRepository
    }
}

const makeNotification = ({ category, content, recipientId }): Notification => {
    return new Notification({
        category,
        content: new Content(content),
        recipientId
    })
}

describe('CountRecipientNotifications', () => {
    it('should be able to count recipient notifications', async () => {
        const { sut, notificationsRepository } = makeSut()

        const notification = makeNotification({ category: 'social', content: 'Nova solicitação de amizade', recipientId: 'fake-recipient-id' })
        const notificationFakeId = makeNotification({ category: 'social', content: 'Nova solicitação de amizade', recipientId: 'recipient-id' })

        await notificationsRepository.create(notification)
        await notificationsRepository.create(notification)
        await notificationsRepository.create(notificationFakeId)
        const recipientNotifications = await sut.execute({ recipientId: notification.recipientId })

        expect(recipientNotifications.count).toEqual(2)
    })

})