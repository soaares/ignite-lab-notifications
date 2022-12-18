import { Injectable } from "@nestjs/common";
import { Notification } from "src/domain/entities/notification";
import { NotificationsRepository } from "src/domain/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prismaService: PrismaService) {}

    async create({ id, content, category, recipientId, readAt, createdAt }: Notification): Promise<void> {
        await this.prismaService.notifications.create({
            data: {
                id,
                content: content.value,
                category,
                recipient_id: recipientId,
                read_at: readAt,
                created_at: createdAt
            }
        })
    }
}