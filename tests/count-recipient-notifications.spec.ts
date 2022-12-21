import { makeSut } from "./factories/count-notifications-factory"
import { makeNotification } from "./factories/notification-factory"

describe('CountRecipientNotifications', () => {
    it('should be able to count recipient notifications', async () => {
        const { sut, notificationsRepository } = makeSut()

        const notification = makeNotification()
        const notificationFakeId = makeNotification({ recipientId: 'fake-recipient-id'})

        await notificationsRepository.create(notification)
        await notificationsRepository.create(notification)
        await notificationsRepository.create(notificationFakeId)
        const recipientNotifications = await sut.execute({ recipientId: notification.recipientId })

        expect(recipientNotifications.count).toEqual(2)
    })

})