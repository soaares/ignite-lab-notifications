import { Injectable } from "@nestjs/common";
import { Notification } from "@domain/entities/notification";
import { NotificationsRepository } from "@domain/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prismaService: PrismaService) { }

    async findById(notificationId: string): Promise<Notification | null> {
        throw new Error("Method not implemented.");
    }

    async create(notification: Notification): Promise<void> {
        const mappedNotification = PrismaNotificationMapper.toPrisma(notification)

        await this.prismaService.notifications.create({
            data: mappedNotification
        })
    }

    async save(notification: Notification): Promise<void> {
        throw new Error("Method not implemented.");
    }
}