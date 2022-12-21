import { Content } from "@domain/entities/content"
import { Notification, NotificationProps } from "@domain/entities/notification"

export const makeNotification = (override: Partial<NotificationProps> = {}): Notification => {
    return new Notification({
        category: 'social',
        content: new Content('Você recebeu uma nova solicitação de amizade.'),
        recipientId: 'any-recipient-id',
        ...override
    })
}