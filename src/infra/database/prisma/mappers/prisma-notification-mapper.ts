import { Notification } from "@domain/entities/notification";

export class PrismaNotificationMapper {
    static toPrisma({ id, content, category, recipientId, readAt, createdAt }: Notification) {
        return {
            id,
            content: content.value,
            category,
            recipient_id: recipientId,
            read_at: readAt,
            created_at: createdAt
        }
    }
}