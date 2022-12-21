import { Notifications as RawNotification } from "@prisma/client";
import { Notification } from "@domain/entities/notification";
import { Content } from "@domain/entities/content";

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

    static toDomain(rawNotification: RawNotification): Notification {
        return new Notification({
            category: rawNotification.category,
            content: new Content(rawNotification.content),
            readAt: rawNotification.read_at,
            createdAt: rawNotification.created_at,
            recipientId: rawNotification.recipient_id
        }, rawNotification.id)
    }
}