import { CountRecipientNotifications } from "@domain/use-cases/count-recipient-notifications"
import { InMemoryNotificationRepository } from "@tests/repositories/in-memory-notifications-repository"

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