import { Content } from "../content";
import { Notification } from "../notification";


type SendNotificationRequest = {
    recipientId: string;
    content: string;
    category: string;
}

type SendNotificationResponse = {
    notification: Notification
}

export class SendNotification {
    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { category, content, recipientId } = request

        const notification = new Notification({
            category,
            content: new Content(content),
            recipientId
        })

        return { notification }
    }
}