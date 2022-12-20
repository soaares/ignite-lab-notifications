import { Injectable } from "@nestjs/common";
import { Notification } from "@domain/entities/notification";
import { NotificationsRepository } from "@domain/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prismaService: PrismaService) {}

    async create(notification: Notification): Promise<void> {
        const mappedNotification = PrismaNotificationMapper.toPrisma(notification)

        await this.prismaService.notifications.create({
            data: mappedNotification
        })
    }
}