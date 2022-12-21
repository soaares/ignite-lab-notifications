import { Notification } from "@domain/entities/notification";

export type NotificationViewModelProps = {
    id: string,
    content: string,
    category: string,
    recipientId: string
}

export class NotificationViewModel {
    static toHTTP({ id, content, category, recipientId }: Notification): NotificationViewModelProps {
        return {
            id,
            content: content.value,
            category,
            recipientId
        }
    }
}