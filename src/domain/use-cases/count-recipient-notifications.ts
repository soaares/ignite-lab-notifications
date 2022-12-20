import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";


type CountRecipientNotificationRequest = {
    recipientId: string;
}

type CountRecipientNotificationsResponse = { count: number }

@Injectable()
export class CountRecipientNotifications {
    constructor(private notificationsRepository: NotificationsRepository) { }

    async execute(request: CountRecipientNotificationRequest): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = request

        const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

        return { count }
    }
}