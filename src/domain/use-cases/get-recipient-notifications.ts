import { Notification } from "@domain/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";


type GetRecipientNotificationRequest = {
    recipientId: string;
}

type GetRecipientNotificationsResponse = { notifications: Notification[] }

@Injectable()
export class GetRecipientNotifications {
    constructor(private notificationsRepository: NotificationsRepository) { }

    async execute(request: GetRecipientNotificationRequest): Promise<GetRecipientNotificationsResponse> {
        const { recipientId } = request

        const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

        return { notifications }
    }
}