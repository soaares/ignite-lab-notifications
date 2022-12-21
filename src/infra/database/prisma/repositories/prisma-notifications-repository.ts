import { Injectable } from "@nestjs/common";
import { Notification } from "@domain/entities/notification";
import { NotificationsRepository } from "@domain/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prisma: PrismaService) { }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notifications.findUnique({ where: { id: notificationId } })
        if (!notification) return null
        return PrismaNotificationMapper.toDomain(notification)
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notifications.findMany({ where: { recipient_id: recipientId } })
        return notifications.map(notification => PrismaNotificationMapper.toDomain(notification))
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notifications.count({ where: { recipient_id: recipientId } })
        return count
    }

    async create(notification: Notification): Promise<void> {
        const mappedNotification = PrismaNotificationMapper.toPrisma(notification)
        await this.prisma.notifications.create({ data: mappedNotification })
    }

    async save(notification: Notification): Promise<void> {
        const mappedNotification = PrismaNotificationMapper.toPrisma(notification)
        await this.prisma.notifications.update({ where: { id: notification.id }, data: mappedNotification })
    }
}