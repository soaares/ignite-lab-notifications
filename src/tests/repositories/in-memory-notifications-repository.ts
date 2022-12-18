import { Notification } from "src/domain/entities/notification"
import { NotificationsRepository } from "src/domain/repositories/notifications-repository"

export class InMemoryNotificationRepository implements NotificationsRepository {
    public notifications: Notification[] = []

    async create(notification: Notification) {
        this.notifications.push(notification)
    }
}
